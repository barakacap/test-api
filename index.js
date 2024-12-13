const express = require('express');
const request = require('request'); // External library for making requests
const util = require('util')
const requestPromise = util.promisify(request);

const app = express();

const purchaseInvoicesSync = 'https://moneybird.com/api/v2/434821316589126683/documents/purchase_invoices/synchronization';
const purchaseInvoices = 'https://moneybird.com/api/v2/434821316589126683/documents/purchase_invoices/synchronization.json';

const generalJournalDocsSync = 'https://moneybird.com/api/v2/434821316589126683/documents/general_journal_documents/synchronization';
const generalJournalDocs = 'https://moneybird.com/api/v2/434821316589126683/documents/general_journal_documents/synchronization.json';

const financialMutationsSync = 'https://moneybird.com/api/v2/434821316589126683/financial_mutations/synchronization.json'
const docsReceiptsSync = 'https://moneybird.com/api/v2/434821316589126683/documents/receipts/synchronization.json'

// const financialMutations = 'https://moneybird.com/api/v2/434821316589126683/financial_mutations/synchronization.json

const authorizationHeader = 'Bearer WRNXyPYTI4EUPH0RISBQ5Cvh4osxzSeaWverc5EzB3c';
const contentTypeHeader = 'application/json';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', async(req, res) => {
    try{
        let allPurchaseInvoices = await getPurchaseInvoices(res)
        let allGeneralJournalDocs = await getGeneralJournalDocs(res)
        let allFinancialMutations = await getFinancialMutations(res)
        let allDocsReceipts = await getDocsReceipts(res)

        let data = {
            allPurchaseInvoices:allPurchaseInvoices,
            allGeneralJournalDocs:allGeneralJournalDocs,
            allFinancialMutations:allFinancialMutations,
            allDocsReceipts:allDocsReceipts,
        }
        // console.log(allGeneralJournalDocs)
        res.status(200).send(JSON.stringify(data));
    }
    catch(err){
        console.error('Error:', err);
    }
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});

const getPurchaseInvoices = async (res) => {
    try {
        let allPurchaseInvoices = []
        const options = {
            url: purchaseInvoicesSync,
            method: 'GET',
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': contentTypeHeader
            }
        };

        const response = await requestPromise(options)

        let invoices = JSON.parse(response.body);
        let divided_invoices = [];
        let desiredDivisor = 100;

        for (let i = 0; i < invoices.length; i += desiredDivisor) {
            let ids = invoices.slice(i, i + desiredDivisor).map(({ id }) => id)
            divided_invoices.push(ids);
        }

        for (let i = 0; i < divided_invoices.length; i++) {
            const payload = {
                ids: divided_invoices[i]
            };
            const options = {
                url: purchaseInvoices,
                method: 'POST',
                headers: {
                    'Authorization': authorizationHeader,
                    'Content-Type': contentTypeHeader
                },
                json: payload
            };
            const response = await requestPromise(options)
            let invoiceInfo = response.body
            allPurchaseInvoices = [...allPurchaseInvoices, ...invoiceInfo]
        }
        return allPurchaseInvoices

    }
    catch (err) {
        console.error('Error:', err);
    }
}

const getGeneralJournalDocs = async(res) => {
    try {
        let allGeneralDocs = []
        const options = {
            url: generalJournalDocsSync,
            method: 'GET',
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': contentTypeHeader
            }
        };

        const response = await requestPromise(options)

        let generalDocs = JSON.parse(response.body);
        let divided_general_docs = [];
        let desiredDivisor = 100;
     
        for (let i = 0; i < generalDocs.length; i += desiredDivisor) {
            let ids = generalDocs.slice(i, i + desiredDivisor).map(({ id }) => id)
            divided_general_docs.push(ids);
        }

        for (let i = 0; i < divided_general_docs.length; i++) {
            const payload = {
                ids: divided_general_docs[i]
            };
            const options = {
                url: generalJournalDocs,
                method: 'POST',
                headers: {
                    'Authorization': authorizationHeader,
                    'Content-Type': contentTypeHeader
                },
                json: payload
            };
            const response = await requestPromise(options)
            let genderalDocsInfo = response.body
            allGeneralDocs = [...allGeneralDocs, ...genderalDocsInfo]
        }
        return allGeneralDocs

    }
    catch (err) {
        console.error('Error:', err);
    }
}

const getFinancialMutations = async(res) => {
    try {
        let allFinancialMutations = []
        const options = {
            url: financialMutationsSync,
            method: 'GET',
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': contentTypeHeader
            }
        };

        const response = await requestPromise(options)

        let financialMutations = JSON.parse(response.body);
        let divided_financial_mutations = [];
        let desiredDivisor = 100;
     
        for (let i = 0; i < financialMutations.length; i += desiredDivisor) {
            let ids = financialMutations.slice(i, i + desiredDivisor).map(({ id }) => id)
            divided_financial_mutations.push(ids);
        }

        for (let i = 0; i < divided_financial_mutations.length; i++) {
            const payload = {
                ids: divided_financial_mutations[i]
            };
            const options = {
                url: financialMutationsSync,
                method: 'POST',
                headers: {
                    'Authorization': authorizationHeader,
                    'Content-Type': contentTypeHeader
                },
                json: payload
            };
            const response = await requestPromise(options)
            let financialMutationsInfo = response.body
            allFinancialMutations = [...allFinancialMutations, ...financialMutationsInfo]
        }
        return allFinancialMutations

    }
    catch (err) {
        console.error('Error:', err);
    }
}

const getDocsReceipts = async(res) => {
    try {
        let allDocsReceipts = []
        const options = {
            url: docsReceiptsSync,
            method: 'GET',
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': contentTypeHeader
            }
        };

        const response = await requestPromise(options)

        let docsReceipts = JSON.parse(response.body);
        let divided_doc_receipts = [];
        let desiredDivisor = 100;
     
        for (let i = 0; i < docsReceipts.length; i += desiredDivisor) {
            let ids = docsReceipts.slice(i, i + desiredDivisor).map(({ id }) => id)
            divided_doc_receipts.push(ids);
        }

        for (let i = 0; i < divided_doc_receipts.length; i++) {
            const payload = {
                ids: divided_doc_receipts[i]
            };
            const options = {
                url: docsReceiptsSync,
                method: 'POST',
                headers: {
                    'Authorization': authorizationHeader,
                    'Content-Type': contentTypeHeader
                },
                json: payload
            };
            const response = await requestPromise(options)
            let docsReceiptsInfo = response.body
            allDocsReceipts = [...allDocsReceipts, ...docsReceiptsInfo]
        }
        return allDocsReceipts

    }
    catch (err) {
        console.error('Error:', err);
    }
}