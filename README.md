Projet14 from open class room.

Convert the jquery datatable plugin to a react component.

Instruction coming soon

you should be able to use the plugin by following this example :
in react component :
<DataTable
data={employeList}
columns={[
{ title: 'First Name', data: 'firstName' },
{ title: 'Last Name', data: 'lastName' },
{ title: 'Start Date', data: 'startDate' },
{ title: 'Department', data: 'department' },
{ title: 'Date of Birth', data: 'dateOfBirth' },
{ title: 'Street', data: 'street' },
{ title: 'City', data: 'city' },
{ title: 'State', data: 'state' },
{ title: 'Zip Code', data: 'zipCode' },
]}
/>

In this example, we format a json file : employeList
json file :
export const employeList = [
{
firstName: 'sebastien',
lastName: 'Mitterand',
dateOfBirth: '4/2/2008',
startDate: '11/4/1982',
department: 71,
street: 'rue du champ de mars',
city: 'Orléans',
state: 'DC',
zipCode: '71659',
},
...
]

So, we give to the component the data json to format, and we give it all the row title, and the data to bind to it.

That's all.

` npm install projet14-datatable`
