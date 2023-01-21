# # Python program to demonstrate
# # command line arguments
# import sys

# # total arguments
# n = len(sys.argv)
# print("Total arguments passed:", n)

# # Arguments passed
# print("\nName of Python script:", sys.argv[1])

# print("\nArguments passed:", end = " ")
# # for i in range(1, n):
# # 	print(sys.argv[i], end = " ")
	
# # # Addition of numbers
# # Sum = 0
# # # Using argparse module
# # for i in range(1, n):
# # 	Sum += int(sys.argv[i])
	
# # print("\n\nResult:", Sum)


from flask import Flask, request
# from script import *
from chatbot import *

app = Flask(__name__)

@app.route('/hello/<name>')
def hello_name(name):
    op = predict(name)
    return op

@app.route('/predict', methods=['POST'])
def getPrediction():
    data = request.get_json()
    query = data['query']
    op = predict(query)
    print(query)
    return op

if __name__ == '__main__':
    app.run()
