const spends = {
    "statusCode": 200,
    "status": "OK",
    "message": "OK",
    "data": {
        "customerId": "5412343121",
        "averageMonthlySpend": "Number",
        "aggregationType": "category",
        "spends": [
            {
                "categoryName": "Healthcare",
                "month": "01",
                "totalAmount": 450,
                "subcategories": [
                    {
                        "subcategory": "Medicine and Pharma",
                        "amount": 450,
                        "isRecuring": true,
                        "transactions": [{
                            "merchant": "Netmeds",
                            "amount": "150",
                            "date": "10-01-2023"
                        },{
                            "merchant": "Dabar",
                            "amount": "200",
                            "date": "12-10-2023"
                        },{
                            "merchant": "Apex",
                            "amount": "100",
                            "date": "12-10-2023"
                        }]
                    }
                ]
            },
            {
                "categoryName": "Shopping",
                "month": "01",
                "totalAmount": 900,
                "subcategories": [
                    {
                        "subcategory": "E-Commerce",
                        "amount": 900,
                        "isRecuring": true,
                        "transactions": [{
                            "merchant": "Amazon",
                            "amount": "400",
                            "date": "1-01-2023"
                        },{
                            "merchant": "Flipcart",
                            "amount": "250",
                            "date": "2-10-2023"
                        },{
                            "merchant": "Ajio",
                            "amount": "250",
                            "date": "3-10-2023"
                        }]
                    }
                ]
            },
            {
                "categoryName": "Travel",
                "month": "01",
                "totalAmount": 1000,
                "subcategories": [
                    {
                        "subcategory": "Online-booking",
                        "amount": 1000,
                        "isRecuring": true,
                        "transactions": [{
                            "merchant": "Mumbai Metro",
                            "amount": "500",
                            "date": "1-01-2023"
                        },{
                            "merchant": "MakeMyTrip",
                            "amount": "250",
                            "date": "2-10-2023"
                        },{
                            "merchant": "EaseMyTrip",
                            "amount": "250",
                            "date": "3-10-2023"
                        }]
                    }
                ]
            }
        ]
    }
}