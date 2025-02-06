from flask import Flask, request, jsonify, Response
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

template = """
Answer the question below.

Here is the conversation history: {context}

Question: {question}

Answer:
"""
model = OllamaLLM(model="llama3")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

with open("string-to-json-online.json", "r") as career_file:
    career_data = json.load(career_file)["professions"]

context = {
    "conversation_history": "",
    "career_suggestions": None,
}


@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Flask Chatbot API!"


@app.route("/chat", methods=["POST"])
def chat():
    global context
    data = request.json

    if "responses" in data: 
        responses = data.get("responses", {})
        if not responses:
            return jsonify({"error": "No responses provided"}), 400

        try:
            response_counts = {"A": 0, "B": 0, "C": 0, "D": 0}
            for answer in responses.values():
                response_counts[answer] += 1

            dominant_category = max(response_counts, key=response_counts.get)

            category_mapping = {
                "A": "Analytical/Logical",
                "B": "Creative/Artistic",
                "C": "Interpersonal/Social",
                "D": "Independent/Practical",
            }
            json_category = category_mapping.get(dominant_category, None)

            if not json_category:
                return jsonify({"error": "Invalid category mapping"}), 500

            suggestions = career_data.get(json_category, {})
            context["career_suggestions"] = suggestions 

            suggestion_text = ", ".join(suggestions.keys())
            context["conversation_history"] += (
                f"\nBased on your responses, the suggested careers are: {suggestion_text}. "
                "Feel free to ask more about these careers or anything else!"
            )

            print("Responses:", responses)
            print("Response Counts:", response_counts)
            print("Dominant Category:", dominant_category)
            print("Mapped Category:", json_category)
            print("Suggestions:", suggestions)

            return jsonify({"response": suggestions})
        except Exception as e:
            print("Error:", str(e))
            return jsonify({"error": str(e)}), 500

    elif "message" in data:
        user_input = data.get("message", "").strip()
        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        try:
            if context["career_suggestions"]:
                suggestion_keys = list(context["career_suggestions"].keys())
                for key in suggestion_keys:
                    if key.lower() in user_input.lower():
                        career = context["career_suggestions"][key]
                        response = (
                            f"{key}: {career['description']}.\nUniversities offering programs include: "
                            + ", ".join(
                                [
                                    f"{uni['university']} ({uni['location']})"
                                    for uni in career["universities"]
                                ]
                            )
                        )
                        context["conversation_history"] += f"\nYou: {user_input}\nAI: {response}"
                        return jsonify({"response": response})

            return Response(stream_response(user_input), content_type="text/event-stream")
        except Exception as e:
            print("Error:", str(e)) 
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid request format"}), 400


def stream_response(user_input):
 
    try:
        is_first_chunk = True
        include_intro = "I am an AI assistant here to help you."
        for chunk in chain.stream({"context": context["conversation_history"], "question": user_input}):
            if chunk.strip():
                if is_first_chunk and not context["conversation_history"]: 
                    chunk = f"{include_intro} {chunk.strip()}"
                    is_first_chunk = False
                context["conversation_history"] += f" {chunk}" 
                yield f"data: {chunk}\n\n"

        # Signal the end of the stream
        yield "data: [DONE]\n\n"
    except Exception as e:
        print("Error in streaming:", str(e))
        yield f"data: Error: {str(e)}\n\n"



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
