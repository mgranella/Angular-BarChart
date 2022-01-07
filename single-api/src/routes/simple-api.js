const Router = require('express');
const router = Router();
const fetch = require('node-fetch');
const constants = require('../constants');

router.get('/:id', async (req, res) => {
console.log(constants.BASE_URL);
    try {
        const id = req.params.id;
        // encode outbound autorization
        const auth = createAuthorization();
        const header = {'Authorization': auth};        
        //const fullUrl = `${constants.BASE_URL}/id-${id}`;
        const fullUrl = `${constants.BASE_URL}/id-1`; // Should use above but always get id:1 for testing
        console.log(`fullUrl: ${fullUrl}`);
        const response = await fetch(fullUrl, { 
            method: 'GET',
            headers: header
        });
    
        if (response.status >= 200 && response.status < 300){         
            //res.status(response.status).json(await response.json());
            res.json(await response.json());
        }
        else {
            res.status(400).json({message: `Failed to get data from jsonbase.com with stauts: ${response.status}`});
        }        
        
    }
    catch (error) {
        res.status(400).json({message: `Unexpected error: ${error}`});
    }
});

function createAuthorization(){
    const base64 = Buffer.from(constants.USER + ':' + constants.PASSWORD, 'utf-8').toString('base64');
    const auth = `Basic ${base64}`;
    console.log(`GET: outbound authorization: ${auth}`);    
    return auth;
};

router.get('', async (req, res) => {
    console.log(constants.BASE_URL);
        try {
            // encode outbound autorization
            //const auth = createAuthorization();
            //const header = {'Authorization': auth};
            const fullUrl = `${constants.BASE_URL}`;
            console.log(`fullUrl: ${fullUrl}`);
            const response = await fetch(fullUrl, { 
                method: 'GET'
            });
        
            if (response.status >= 200 && response.status < 300){         
                //res.status(response.status).json(await response.json());
                const resultObj = await response.json();
                let ojb2021 = [];
                //ojb2021 = resultObj.series[0].data.filter( (item) => { return item[0] >= '20190101' && item <= '20191231'}).sort((a,b) => {return a[0] - b[0]});
//console.log(`resultObj:: ${JSON.stringify(resultObj)}`);
//{"request":{"command":"series","series_id":"PET.RWTC.D"},"series":[{"series_id":"PET.RWTC.D","name":"Cushing, OK WTI Spot Price FOB, Daily","units":"Dollars per Barrel","f":"D","unitsshort":"$/bbl","description":"Cushing, 
//OK WTI Spot Price FOB","copyright":"Thomson-Reuters","source":"Thomson-Reuters","iso3166":"USA-OK","geography":"USA-OK","start":"19860102","end":"20211206","updated":"2021-12-08T13:20:03-0500","data":[["20211206",69.62],["20211203",66.39],["20211202",66.6],["20211201",65.44],
                ojb2021 = resultObj.series[0].data.filter( item => item[0] >= '20190101' && item <= '20191231').sort((a,b) => a[0]-b[0]);

                let sum = 0;
                let count = 0;
                let avgPrice = 0;
                let prevMonth = '';
                let objResult = [];
console.log(`ojb2021:: ${JSON.stringify(ojb2021)}`);
                ojb2021.forEach((item) => {
                    let month = item[0].substring(4,6);

                    if (prevMonth==''){
                        prevMonth = month;
                    }

                    if(month!=prevMonth){
                        avgPrice = (sum / count);                        
                        objResult.push({ month: prevMonth, averagePrice: avgPrice, sum: sum, qty: count});
                        //objResult.push([ prevMonth, avgPrice, sum, count ]);
                        prevMonth = month;
                        sum = 0, count = 0; // reset values
                    }

                    sum = sum + item[1];
                    count++;
                    avgPrice = (sum / count);                     
                });

                objResult.push({ month: prevMonth, averagePrice: avgPrice, sum: sum, qty: count});
                //objResult.push([ prevMonth, avgPrice, sum, count ]);
//falto sort and display results in angular
// mentiones O logarithm as teh best solution for sorting


                //res.json(await response.json());                
                //res.json({ averagePrice: avgPrice}); 
                return res.json(objResult);
            }
            else {
                res.status(400).json({message: `Failed to get data from jsonbase.com with stauts: ${response.status}`});
            }        
            
        }
        catch (error) {
            res.status(400).json({message: `Unexpected error: ${error}`});
        }
    });

module.exports = router;