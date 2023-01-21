'use strict'

import { axios } from '@m92/express-utils/dist/ExpressUtils';
import _ from 'lodash'
import { Configuration, OpenAIApi } from "openai";
const { spawn } = require('child_process')

const AIModel = {
  getStart,
  getModelResponse,
  getRd,
}

export default AIModel

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

async function getStart(params) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    return response?.data
}

async function questionCheck(params) {
    const prompt = "If the sentence: " +params+ " -is similar to any of the following texts then return that text, else return Not Found. \nTexts: \nwhen is my bill date due \n what if I don't pay bill on time? \n what is my current credit limit? \n how much is my outstanding home loan? \n Suggest a axis product based on my spending and return the best answer"
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        
      });
      console.log(prompt)
    
      return response?.data
  }

  async function getModelResponse(params) {
    const query = params?.query
    const custId = params?.id;
    if(custId!=="") 
    {
      console.log(query)
        const question = await questionCheck(query)
        let text = question.choices[0].text
        text = text.replace(/^\s+|\s+$/gm,'')
        console.log(text)
        if(text !== 'Not Found'){
          console.log(text);
          return ETBMock[text];
        }
    }
    const endpoint = "http://127.0.0.1:5000/predict"
    const response = await axios.post(endpoint,{query});
    return response?.data
}


function getRd(params){
  const custId = params?.id;
  const spendsArray = spends.data.spends
  const maptotal = {};
  spendsArray.forEach((key)=>{
    const transactions = key.transactions;
    transactions.forEach((obj)=>{
      if(obj.Name === 'Others' || obj.Name === 'Fund Transfer'  )return;
      if(obj.Name in maptotal){
        maptotal[obj.Name] = maptotal[obj.Name]+obj.Amount;
      }else{
        maptotal[obj.Name] = obj.Amount;
      }
    })
  })

  const maptotalCount = {};
  spendsArray.forEach((key)=>{
    const transactions = key.transactions;
    transactions.forEach((obj)=>{
      if(obj.Name === 'Others' || obj.Name === 'Fund Transfer' )return;
      if(obj.Name in maptotalCount){
        maptotalCount[obj.Name] = maptotalCount[obj.Name]+1;
      }else{
        maptotalCount[obj.Name] = 1;
      }
    })
  })
  const sortedValue = Object.entries(maptotal)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  console.log(sortedValue);
  const sortedCount = Object.entries(maptotalCount)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  console.log(sortedCount);
  return {value : sortedValue, count : sortedCount};
}

const ETBMock = {
  "when is my bill date due":"Your bill payment is due on 21st Jan'23",
  "what if I don't pay bill on time?":"You will have to pay a 3% interest on your overall bill. It will be charged in your next bill cycle.",
  "what is my current credit limit?":"Your current limit is Rs.320000 as you have already spent Rs.80000 this month",
  "how much is my outstanding home loan?":"You have Rs.2 cr loan outstanding. Principal is Rs. 1.2 cr, Interest is Rs.80 lakhs",
  "Suggest a axis product based on my spending":"As your major spending has been in travel category in the last 3 months, you can opt for Travel Forex Card"
}

const mockCustID = {
  "1":{
    "cibilScore":780, 
    "age" : 28,
    "annualIncome": 100000,
    "gender": 'F',
    "mockHistory":{

    }
  },
  "2":{
    "cibilScore":800, 
    "age" : 30,
    "annualIncome": 200000,
    "gender": 'F',
    "mockHistory":{

    }
  },
  "3":{
    "cibilScore":855, 
    "age" : 40,
    "annualIncome": 300000,
    "gender":'F',
    "mockHistory":{

    }
  },
  "4":{
    "cibilScore":880, 
    "age" : 45,
    "annualIncome": 500000,
    "gender": 'M',
    "mockHistory": {

    }
  },
  "5":{
    "cibilScore":900, 
    "age" : 42,
    "annualIncome": 600000,
    "gender": 'F',
    "mockHistory":{
    }
  }
}

const spends = {
  "data": {
      "spends": [
          {
              "Name": "CC",
              "YearMonth": "2023-01",
              "totalAmount": 6621.95,
              "transactions": [
                  {
                      "Name": "Payments",
                      "Amount": 1010,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Fuel",
                              "Amount": 1010,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Entertainment",
                      "Amount": 367,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Entertainment-Others",
                              "Amount": 367,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Travel",
                      "Amount": 100,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Airlines",
                              "Amount": 100,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Shopping",
                      "Amount": 326.95,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Groceries & Other Consumables",
                              "Amount": 326.95,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Food",
                      "Amount": 4818,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Restaurants",
                              "Amount": 4818,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "UPI",
              "YearMonth": "2023-01",
              "totalAmount": 2,
              "transactions": [
                  {
                      "Name": "Food",
                      "Amount": 2,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Restaurants",
                              "Amount": 2,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "UPI",
              "YearMonth": "2022-09",
              "totalAmount": 5900,
              "transactions": [
                  {
                      "Name": "Fund Transfer",
                      "Amount": 5900,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Withdrawals",
                              "Amount": 5900,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "CC",
              "YearMonth": "2022-09",
              "totalAmount": 43463.99,
              "transactions": [
                  {
                      "Name": "Entertainment",
                      "Amount": 985.88,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Entertainment-Others",
                              "Amount": 448,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Movies",
                              "Amount": 537.88,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Food",
                      "Amount": 8391,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Restaurants",
                              "Amount": 8391,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Shopping",
                      "Amount": 21922.18,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Personal Care",
                              "Amount": 500,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Groceries & Other Consumables",
                              "Amount": 5144.18,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Ecommerce",
                              "Amount": 16278,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Others",
                      "Amount": 12164.93,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Government Services or Fire Departments",
                              "Amount": 1128.88,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Others",
                              "Amount": 11036.05,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "CC",
              "YearMonth": "2022-10",
              "totalAmount": 29578.23,
              "transactions": [
                  {
                      "Name": "Others",
                      "Amount": 6842,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Business Services",
                              "Amount": 1199,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Government Services or Fire Departments",
                              "Amount": 500,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Others",
                              "Amount": 5143,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Payments",
                      "Amount": 606,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Fuel",
                              "Amount": 606,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Travel",
                      "Amount": 2639.23,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Railways ",
                              "Amount": 2639.23,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Shopping",
                      "Amount": 8654.4,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Groceries & Other Consumables",
                              "Amount": 4486.4,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Ecommerce",
                              "Amount": 3069,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Personal Care",
                              "Amount": 500,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Electronics",
                              "Amount": 599,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Entertainment",
                      "Amount": 864.6,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Movies",
                              "Amount": 484.6,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Entertainment-Others",
                              "Amount": 380,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Healthcare",
                      "Amount": 4312,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Healthcare-Others",
                              "Amount": 4312,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Food",
                      "Amount": 5660,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Restaurants",
                              "Amount": 944,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Food Delivery",
                              "Amount": 476,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Alcohol",
                              "Amount": 4240,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "UPI",
              "YearMonth": "2022-10",
              "totalAmount": 11500,
              "transactions": [
                  {
                      "Name": "Fund Transfer",
                      "Amount": 11500,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Withdrawals",
                              "Amount": 11500,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "CC",
              "YearMonth": "2022-08",
              "totalAmount": 32505.07,
              "transactions": [
                  {
                      "Name": "Travel",
                      "Amount": 6000,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Accomodation",
                              "Amount": 6000,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Food",
                      "Amount": 21154.52,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Food Delivery",
                              "Amount": 1997.12,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Restaurants",
                              "Amount": 19157.4,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Entertainment",
                      "Amount": 1190.8,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Entertainment-Others",
                              "Amount": 367,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Movies",
                              "Amount": 823.8,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Payments",
                      "Amount": 303,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Fuel",
                              "Amount": 303,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Shopping",
                      "Amount": 2769.15,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Groceries & Other Consumables",
                              "Amount": 2769.15,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Others",
                      "Amount": 1087.6,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Others",
                              "Amount": 1087.6,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "CC",
              "YearMonth": "2022-12",
              "totalAmount": 110401.7,
              "transactions": [
                  {
                      "Name": "Travel",
                      "Amount": 11468.07,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Railways ",
                              "Amount": 4996.57,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Travel & Tours",
                              "Amount": 6471.5,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Entertainment",
                      "Amount": 963,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Entertainment-Others",
                              "Amount": 963,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Payments",
                      "Amount": 5888,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Mobile Bill Payments",
                              "Amount": 5888,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Others",
                      "Amount": 520,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Others",
                              "Amount": 520,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Food",
                      "Amount": 5553.72,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Food Delivery",
                              "Amount": 761.72,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Restaurants",
                              "Amount": 4792,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Shopping",
                      "Amount": 86008.91,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Groceries & Other Consumables",
                              "Amount": 1297.5,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Ecommerce",
                              "Amount": 45034,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Apparel",
                              "Amount": 3285,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Home Furnishing",
                              "Amount": 1604,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Electronics",
                              "Amount": 34788.41,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "CC",
              "YearMonth": "2022-11",
              "totalAmount": 19824.49,
              "transactions": [
                  {
                      "Name": "Entertainment",
                      "Amount": 430,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Entertainment-Others",
                              "Amount": 430,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Shopping",
                      "Amount": 4200.62,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Ecommerce",
                              "Amount": 311.02,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Groceries & Other Consumables",
                              "Amount": 1784.6,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Apparel",
                              "Amount": 1605,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Personal Care",
                              "Amount": 500,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Healthcare",
                      "Amount": 124,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Hospital",
                              "Amount": 124,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Payments",
                      "Amount": 969,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Fuel",
                              "Amount": 303,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Bill/Utility Payments",
                              "Amount": 666,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Food",
                      "Amount": 6738.55,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Alcohol",
                              "Amount": 3810,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Restaurants",
                              "Amount": 2462,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Food Delivery",
                              "Amount": 466.55,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Investment",
                      "Amount": 1208,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Insurance",
                              "Amount": 1208,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Others",
                      "Amount": 6152.32,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Government Services or Fire Departments",
                              "Amount": 1566.32,
                              "isRecuring": ""
                          },
                          {
                              "Name": "Others",
                              "Amount": 4586,
                              "isRecuring": ""
                          }
                      ]
                  },
                  {
                      "Name": "Travel",
                      "Amount": 2,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Cab/Bike Services",
                              "Amount": 2,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          },
          {
              "Name": "UPI",
              "YearMonth": "2022-11",
              "totalAmount": 5000,
              "transactions": [
                  {
                      "Name": "Fund Transfer",
                      "Amount": 5000,
                      "isRecuring": "",
                      "transactions": [
                          {
                              "Name": "Withdrawals",
                              "Amount": 5000,
                              "isRecuring": ""
                          }
                      ]
                  }
              ]
          }
      ]
  }
}
 

