import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/ControllerForParentAccountRelatedlists.getAccounts';
import getContacts from '@salesforce/apex/ControllerForParentAccountRelatedlists.getContacts';
import getImplementations from '@salesforce/apex/ControllerForParentAccountRelatedlists.getImplementations';
import getOpportunities from '@salesforce/apex/ControllerForParentAccountRelatedlists.getOpportunities';
import isParentAccount from '@salesforce/apex/ControllerForParentAccountRelatedlists.isParentAccount';

const ACCOUNT_COLUMNS = [
    { label: 'Account Name', fieldName: 'linkName', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' } },
    { label: 'Billing City', fieldName: 'BillingCity', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

const CONTACT_COLUMNS = [
    { label: 'Contact Name', fieldName: 'linkName', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }, sortable: true },
    { label: 'Mobile', fieldName: 'MobilePhone', type: 'phone', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', sortable: true },
  //  { label: 'Is Primary', fieldName: 'IsPrimary__c', type: 'checkbox', sortable: true },
    { label: 'Secondary Email', fieldName: 'Secondary_Email__c', type: 'email', sortable: true }
];

const IMPLEMENTATION_COLUMNS = [
    { label: 'Implementation Name', fieldName: 'linkName', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' } },
    { label: 'Health', fieldName: 'Health__c', type: 'picklist' },
    { label: 'Implementation Status', fieldName: 'Implementation_status_2__c', type: 'picklist' },
    { label: 'Office Launch Date', fieldName: 'Office_Go_Live_Date__c', type: 'date' },
    { label: 'Activation Date', fieldName: 'Graduation_Date__c', type: 'date' }
];
  
const OPPORTUNITY_COLUMNS = [
    { label: 'Opportunity Name', fieldName: 'linkName', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' } },
    { label: 'Stage', fieldName: 'StageName', type: 'text' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency' }
];

export default class ParentAccountRelatedlists extends LightningElement {
    @api recordId;
    Account;
    myColumnsAccount = ACCOUNT_COLUMNS;

    Opportunity;
    mycolumnsopportunities = OPPORTUNITY_COLUMNS;

    Contact;
    myColumnscontacts = CONTACT_COLUMNS;

    Implementation;  
    myColumnsImplementation = IMPLEMENTATION_COLUMNS;

    accountsExist = false;
    isParent = false;
    



    connectedCallback()

    {
        console.log(this.recordId);
        this.fetchContactsfromApex();
        this.fetchAccountsfromApex();
        this.isParentAccountApex()
        this.fetchContactsfromApex();
        this.fetchOpportunitiesfromApex();
        this.fetchImplementationsfromApex();
    }

    fetchContactsfromApex()
    {
        getContacts({accountId : this.recordId })
        .then(data => {
            this.Contact = data.map(Contact => {
                return { ...Contact, linkName: '/' + Contact.Id };
            });
        }).catch(error => {
            console.log('Contact Error');
            console.log(error);
        });
    }

    fetchAccountsfromApex(){
        getAccounts({accountId : this.recordId })
        .then(data => {
            this.Account = data.map(Account => {
                return { ...Account, linkName: '/' + Account.Id };
            });
        }).catch(error => {
            console.log('Account Error');
            console.log(error);
        });
    }

    fetchImplementationsfromApex(){
        getImplementations({accountId : this.recordId })
        .then(data => {
            this.Implementation = data.map(Implementation => {
                return { ...Implementation, linkName: '/' + Implementation.Id };
            });
        }).catch(error => {
            console.log('Implementation Error');
            console.log(error);
        });
    }
        isParentAccountApex(){
            isParentAccount({accountId : this.recordId })
        .then(data => {
            this.isParent = data;
        }).catch(error => {
            console.log('Account Error');
            console.log(error);
        });
    }


    fetchOpportunitiesfromApex(){
        getOpportunities({accountId : this.recordId })
        .then(data => {
            this.Opportunity = data.map(Opportunity => {
                return { ...Opportunity, linkName: '/' + Opportunity.Id };
            });
        }).catch(error => {
            console.log('Opportunity Error');
            console.log(error);
        });
} 

 /*   @wire(getAccounts, { accountId: '$recordId' })
    wiredAccounts({ error, data }) {    
        if (data) {
            console.log('Account Data');
            console.log(data);
            this.Account = data.map(Account => {
                return { ...Account, linkName: '/' + Account.Id };
            });
        } else if (error) {
            console.error(error);
        }
    }
    @wire(isParentAccount, { accountId: '$recordId' })
    wiredIsParent({ error, data }) {
        if (data) {
            console.log('isParent Data');
            console.log(data);
            this.isParent = data;
            this.accountsExist = this.isParent;
        } else if (error) {
            console.error(error);
        }
    }*/

    /*@wire(getContacts, { accountId: '$recordId' })
    wiredContacts({ error, data }) {
        if (data) {
            console.log('-----Contact Data');
            console.log(data);
            this.Contact = data.map(Contact => {
                return { ...Contact, linkName: '/' + Contact.Id };
            });
        } else if (error) {
            console.error('Contact Error'+error);
            console.log(error);
        }
    }
 
    @wire(getImplementations, { accountId: '$recordId' })
    wiredImplementations({ error, data }) {
        if (data) {
            this.Implementation = data.map(Implementation => {
                return { ...Implementation, linkName: '/' + Implementation.Id };
            });
            console.log('------impppp'+this.Implementation);
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getOpportunities, { accountId: '$recordId' })
    wiredOpportunities({ error, data }) {
        if (data) {
            this.Opportunity = data.map(Opportunity => {
                return { ...Opportunity, linkName: '/' + Opportunity.Id };
            });
        } else if (error) {
            console.error(error);
        }
    }  */
}
