FROM python:3.8
COPY . /chatbot
WORKDIR chatbot
RUN pip install -r requirements.txt
EXPOSE 8080
CMD ["uvicorn", "app:app", "--port=8080", "--host=0.0.0.0"]