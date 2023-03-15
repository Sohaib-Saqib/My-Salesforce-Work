import { LightningElement, api, wire } from 'lwc';
import getAccountOpp from '@salesforce/apex/ControllerimplementationAccountOppLwc.getAccountOpp';


const COLUMNS = [
    { label: 'Opportunity Name', fieldName: 'linkName', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' } },
    { label: 'Stage', fieldName: 'StageName', type: 'text' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency' }
];

export default class implementationAccountOppLwc extends LightningElement {
    @api recordId;
    Implementation;
    myColumns = COLUMNS;

    @wire(getAccountOpp, { ImpId: '$recordId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.Implementation = data.map(Implementation => {
                return { ...Implementation, linkName: '/' + Implementation.Id };
            });
        } else if (error) {
            console.error(error);
        }
    }
}
