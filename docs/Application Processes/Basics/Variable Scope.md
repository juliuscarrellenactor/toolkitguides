# Variable Scope

Data Transfers between Process Elements occur in association with Events and Outcomes. The Data Transfers that occur are defined as mappings associated with Process Flows, some of which will be recognised as appropriate and defined automatically by the Process Design Editor and which can be supplemented according to Design requirements. Data Elements used within Actions can be defined as Outputs of the Action and mapped to the State or Process, including if the Action is a Call Process and the data derives as Output of the Called Process.

## State Level Scope

If Process Flows occur between Actions or return to the same State, the Data Elements mapped to the State exist for the life of the State and are available (subject to mapping) to all Actions within that State. The life of the State ends when a Process Flow to another State occurs. All State Level Data Elements other than those explicitly specified as Inputs to the target State of the Process Flow will cease to exist. 

## Process Level Scope

Should data be required to persist beyond the life of a State it can be mapped to the Process where it will be retained as Process Level State Data and will be available (subject to mapping) to all States and Actions within the Process. All data associated with the Process and all States within the Process, other than those elements explicitly mapped to Outputs of the Process, will cease to exist when the Process terminates.

## View Level Scope

Enactor provides means by which data may be persisted in memory over the life of multiple application executions. The user may exit an Application Process, which has persisted data in the View, by executing another Process in the same View context, which will then have access to the data stored by the first Process or it may initiate a background Process, which similarly has access to the View Data. Also, View Data elements may be defined by Application Start-up procedures, prior to execution of any Application Process and available as standard Data Items for all Application Processes within the View. View Data elements may also provide default values; for any Process that has Input Data Items, for which values have not been supplied by the mechanism that invokes the Process, matching Item names will be sought in View Data and if found, will be used to supply values.

This functionality is made available to Application Processes by way of the Action Classes **UISetViewDataAction** and **UIGetViewDataAction**. Application Processes may therefore create Data Items available at the View level to other Processes and Applications. Implementation and use of the View Context is dependent on the deployment context and so View Scope will be discussed further regarding deployment of Application Processes.

