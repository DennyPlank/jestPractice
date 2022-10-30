import CurrencyComparison from '../currency_comparison';

// Task 14: Import and mock fetchData
import fetchedData from '../utils/fetch-data.js'
jest.mock('../utils/fetch-data.js')

const testSalary = new CurrencyComparison(50000)
    
// Task 4: Create a test for testSalary.currencyConversion below
test("currency converted from one denomination to another", ()=>{
  // Arrange
   const currencyCode1 = 'CAD'
   const expectedValue1= 1.21
   const currencyCode2 = 'EUR'
   const expectedValue2 = .82
   const rates = {
      "MXN": 19.9021,
      "CAD": 1.2121,
      "EUR": .8235
    };

  // Act
  let actualValue1 = testSalary.currencyConversion(rates, currencyCode1);
  let actualValue2 = testSalary.currencyConversion(rates, currencyCode2);
  // Assert
  expect(actualValue1).toBe(expectedValue1)
  expect(actualValue2).toBe(expectedValue2)
});

// Task 8: Create a test for testSalary.hourlyPayUSD below
  // test("Converts salary to hourly USD",()=>{
  //   // Arrange
  //   const conversionRateCAD = 1.21;
  //   const hourlyPayInUSD = testSalary.hourlyPayUSD(conversionRateCAD);
  //   // console.log(hourlyPayInUSD);

  //   // Act
  //   const currency = "EUR"
  //   const currencyExchangeRate = 1.21
  //   testSalary.response(currency, currencyExchangeRate, giveMeMyDataBack =>{
  //     // console.log(giveMeMyDataBack)

  //     // Assert

  //   })
  // })


// Task 9: Complete this test!
test("respond with different salaries based on currency", (done) => {
  //arrange
  const currency = "CAD"
  const exchangeRate = 1.21
  const expectedValue = {
    USD: 25,
    CAD: 20.66,
    salary: 50000,
  }

  //act
  testSalary.response(currency, exchangeRate, (result) => {
  //assert
    console.log("The result is ", result)
    try {
      expect(result).toBeDefined()
      expect(result).toStrictEqual(expectedValue);
      expect(result[3]).not.toBeDefined()
      expect(result.salary).toBe(50000)
      done()
    }catch (error) {
      done(error)
    }
  })
})

// Task 11: Complete this test!
test("Receives current currency exchange data", async ()=>{
  //arrange
  const expectedValue = "Mock";
  
  //act
  const actualValue = await testSalary.fetchCurrentExchange();

  //assertions
    expect(actualValue[1]).toBe(expectedValue)
  
})

// Task 15: Complete this test!
test("Receives current currency exchange data", async ()=>{
  //arrange
  const mockResponse = {
    status : "Mock",
    data: {
      "base": "USD",
      "rates": {
        "CCD": 50,
      },
      "date": "2021-05-17"
    }
  }
  const expectedValue = [{"CCD": 50}, "Mock"];

  // Mock the resolved value of fetchData
  fetchedData.mockResolvedValueOnce(mockResponse)
  
  //act
  const actualValue = await testSalary.fetchCurrentExchange() 
  
  //assertions
 expect(actualValue).toStrictEqual(expectedValue)
})
