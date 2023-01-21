const investment = {
    "statusCode": 200,
    "status": "OK",
    "message": "OK",
    "data": {
        "customerName": "NIRAV BIPINCHANDRA CHAUHAN",
        "totalInvestedAmountForAllProducts": 146999.99,
        "publicProvidentFund": {
            "isSI": 1,
            "totalSIAmount": 0,
            "isActive": 1,
            "hasContributedInCurrentFinancialYear": "0",
            "detailed": {
                "statusCode": 404,
                "errorMessage": "No PPF Account Number Exists For the Customer Id 898361553",
                "isActive": "0"
            }
        },
        "fixedDeposit": {
            "detailed": {
                "aggregatedFD": {
                    "totalPrincipalAmountFD": 146000,
                    "totalCurrentValueFD": 141000,
                    "totalMaturityAmountFD": 160126
                }
            }
        },
        "recurringDeposit": {
            "totalUniqueCustomersInvestingPerMonth": 2,
            "detailed": {
                "aggregatedRD": {
                    "totalPrincipalAmountRD": 0,
                    "totalCurrentAmountRD": 0,
                    "totalMaturityAmountRD": 0,
                    "totalRecurringAmountRD": 0
                }
            }
        },
        "nps": {
            "isSIP": 0,
            "isActive": 1,
            "totalInvestmentAmountInCurrentFinancialYear": 500,
            "detailed": {
                "totalAmount": 500,
                "ucStatus": "S",
                "gbmStatusCode": "S",
                "gbmStatusDesc": "success",
                "tierOneInvestmentAmount": "500",
                "tierTwoInvestmentAmount": "0"
            }
        },
        "mutualFund": {
            "totalInvestedAmount": 499.99,
            "totalCurrentAmount": 735.66,
            "averageSIPAmountPerCustomer": 6106.64,
            "averageNumberOfSIPPerCustomer": 5.1,
            "hasMonthlySIP": 0,
            "isActive": 1,
            "detailed": {
                "customerId": "898361553",
                "gainOrLossPercentage": 0.4714,
                "totalNoOfCustomersHavingSIP": 5.1
            }
        },
        "digitalGold": {
            "detailed": {
                "sipDetails": {
                    "sipSumAmount": 0,
                    "totalLiveSip": 0
                },
                "balance": "0.6259"
            }
        },
        "customerId": "898361553",
        "hasPPFAccountHolderSetUpSI": 1,
        "totalUniqueCustomersInvestingPerMonth": 7.4,
        "totalNoOfCustomersInvestedInAnyProduct": 24.9,
        "hasMadeContributionInCurrentFinancialYear": "1",
        "monthlyIncome": 108541,
        "idealMonthlyInvestment": 45000,
        "isSalaryCreditedToAxis": true
    }
}