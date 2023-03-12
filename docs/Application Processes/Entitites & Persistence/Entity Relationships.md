# Entity Relationships

Enactor Entities are principally Classes designed to facilitate the communication of data in distributed systems. Keyed entities have additional properties and methods, which facilitate persistence of these entities. Applications typically require maintaining relationships between Entities: between customers and orders, orders and order items, suppliers and their addresses. Regarding Entity persistence the simplest case implementation is a relationship maintained between a keyed and a non-keyed Entity.

## Contained Entities

Non-Keyed Entities cannot be independently persisted; they can be properties within keyed Entities, which are persisted, and when they are, the non-keyed Entity will be stored in XML. If the relationship is one-to-many the non-keyed entity may be defined in the primary Entity as the recurring element in a list or collection; again, if the primary Entity is keyed the list or collection of secondary Entities it contains is persisted in XML. The JAXB Java annotations of the Non-Keyed Entity contribute to the information used by JAXB in marshalling of the primary Entity.

These cases, involving one-to-one and one-to-many Entity relationships persisted in the XML of the primary entity, are accommodated by the Entity Wizard. This is just a matter of specifying a property of the primary Entity for which the data type is the secondary Entity or a list or collection, of which the data type of the elements is the secondary Entity.  

Where the Entity relationship is one-to-***one*** (and *only* when the relationship is one-to-one) the properties of the non-keyed Entity can be mapped out of XML into columns of the table of the primary Entity. This can be achieved by addition of Mapping File entries for these properties as discussed in the earlier section ***Adding Sub-Class Entity Columns in the Mapping File***. The new mappings must identify these properties by reference to the non-keyed Entity using the dot notation to specify both the Entity and its property, for example:

``` xml title="Mapping.xml"

<core:property>

<core:columnName>EntityX\_Property\_A </core:columnName>

<core:propertyName>EntityX.propertyA</core:propertyName>

</core:property>

```

![](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.001.png)

However, the properties of the Contained Entities of a one-to-***many*** Entity relationship cannot be mapped out of XML into columns of the Super-Class Entity table, neither by the Entity wizard, nor by manual mapping in the Mapping File; a separate table is required.


## Creating a Non-Keyed Entity

To create a Non-Keyed Entity the Enactor Entity wizard is applied in the same way as described in the section ***Creating a Keyed Entity with the*** Entity Wizard***, with the exception that the ***Keyed*** (and correspondingly, ***Timestamped***) features are unchecked at the **Entity Settings** stage. 

|![Graphical user interface Description automatically generated](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.002.png)|Unchecking the ***Keyed*** CheckBox informs the wizard that the Entity being created will not be persisted independently; it will therefore not create a *Key*, *Mapping File* or *Server Definition* for the Entity and consequently will not proceed to the **Database Mappings** or **Additional Database Settings** phases.

**Properties for Deployment Entity** 

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.003.png)|

For the purposes of the current example the simple Non-Keyed Deployment Entity with properties DeploymentType, DeploymentRole and DeploymentLocation will be used in extending the example first to implement a Single Contained Entity relationship to Manager and subsequently a contained Entity Collection relationship to Employee. Properties of the contained entity are all String types that will be populated from Combo Boxes.


### **Revising Entity Definitions with the Entity Wizard**

The Entity wizard can be used to modify Entity definitions. In the earlier sections Entity Settings*** and File Creation and Modification*** mention was made of the *Keep definition file* Checkbox. If left checked the wizard will record all responses it receives in an XML file for later use if the Entity wizard is used to modify the Entity. In the case of Manager these responses are recorded in the file ***Manager-Details.xml***, which was created by the Entity wizard in the *EnactorEntities* package. The Entity wizard will re-launch to modify the Entity in response to double-mouse-click on the Entity details definition file ***Manager-Details.xml***. Information that was provided to the previous Entity creation or modification session will be used to supply default responses throughout the update session. This facility can be used to modify the *Manager* Entity as required in the following example.


## Implementing a Single Contained Entity

The example application developed in the previous section will provide the starting point for the present example. A Single Entity relationship of *Manager* to *Deployment* can now be implemented by adding a property of type *Deployment* to *Manager*. This can be conveniently done by re-visiting the Entity wizard process with *Manager*, as described above. To do this double-mouse-click on the ***Manager-Details.xml*** icon in the Project panel under the *EnactorEntities* package. In the Entity wizard, select *Next*, accepting the supplied input values through all stages of the wizard process to the **Entity Properties** stage where the new property *MgrDeployment* can be added as illustrated below and described following:

Selecting the Component Type:

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.004.png)

Search and select Deployment Entity

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.005.png)

In the **Entity Properties** stage, to specify the datatype of the new property, select the *MgrDeployment* property (as illustrated above) then select ***Complex*** in the **Data Type** drop-down list and leave the **Collection Type** as ***None***. Select ***Type…*** in the **Component Type** drop-down.  Upon selection the ***Select Type*** panel displays and may be used to search and select the Component Type of the property, which will be *Deployment*. Use **CTRL-SPACE** in the *Select Entries* field to obtain access to the full list of library and current application complex types and then begin typing *Deployment* to narrow the search. Select *Deployment* (of the EnactorEntities package) and click OK. This is the last stage of the wizard; select ***Finish*** and accept ***Replace*** as the action on all modified files:

![Table Description automatically generated](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.006.png)


### **Using Single Contained Entities in Processes**

This implementation of a Single Entity relationship amounts to an addition of properties to the Primary Entity and impacts primarily UI elements involved in the capture of properties. The technique already applied in the example application for capture of properties of the Sub-Class Entity *Manager* in a separate panel extends to accommodate capture of the properties of the contained entity. The additional properties associated with *Deployment* can also be referenced in this panel using the dot notation *via* reference to this re-declared *Employee* variable and can be mapped in the ***Value*** property of the Input Text Controls using: (for example) ***#{employee.mgrDeployment.deploymentRole}***.

Recall that this technique involved use of the instanceOf() function in an expression to differentiate the super- and Sub-Class, re-declaration of the *Employee* variable as being of the Sub-Class type *Manager* within the panel and the application of the *Visibility Expression* and *Rendered* properties of the panel. 

The *Save* Called Process now needs conditionally (if *Employee* belongs to the SubClass) to instantiate the *Deployment* Entity and assign it to the *MgrDeployment* property of *Employee* Entity. Since the values of properties of the *Deployment* Entity are assigned using Combo Boxes, the source values are assigned to lists within a separate Called Process using the same technique described in the ComboBox example of the chapter on Page Definitions and the ComboBox selections are mapped to the Entity properties in an Assign Action when effecting the *Save* Event, again, conditionally on *Employee* belonging to the SubClass. The revised *Save* process is shown below with the relevant Process elements expanded:

![Application Description automatically generated with low confidence](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.007.png)


### **Mapping Contained Single Entity Properties to Columns**  

Properties of the contained Entity are referenced using the standard dot notation to the primary Entity, the property of it that references the Contained Entity and the properties of the Contained Entity itself. For example:

***manager.mgrDeployment.deploymentType***.

This notation has been applied in Expressions in the Page Definition and *Save* Process of the example application and is applied also in the Mapping File.

All of the properties of the *Deployment* Entity, which has been added as a property of *Manager*, will be mapped, by default, to XML and persisted in the XML column of the *Manager* table (if the XML column is provided for). Alternatively, these properties could also be mapped to columns of the table of the primary Entity (*Manager*) using the mechanism discussed in the earlier section ***Adding Sub-Class Entity Columns in the Mapping File***.  Mappings of the properties of the Contained Entity are applied in the Mapping File in the same way, again by applying the ***dot notation*** to reference properties of the Contained Entity as in this example from the Employee.xml Mapping File:

``` xml 

<core:property>

<core:columnName>Deployment\_Type</core:columnName>	<core:propertyName>mgrDeployment.deploymentType</core:propertyName>

<core:columnType>STRING</core:columnType>

<core:persistenceType>2</core:persistenceType>

<core:allowNull>true</core:allowNull>

<core:length>40</core:length>

<core:applicableClassName>

com.enactor.sample.enactorentities.Manager</core:applicableClassName>

</core:property>

```

![](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.008.png)

It is particularly important to note that this alternative implementation can be applied *after* the phases of Entity and Process design without impact on either. It is the persistence layer, below the level of Entity definition and independent of the application, that determines and applies whether the properties of the related, non-keyed Entity are in XML only or mapped out to columns. The process, therefore, which effects persistence at the Entity level, is unaffected. Also, containment of one (non-keyed) Entity as a property of another (keyed) Entity essentially implements and preserves integrity of the relationship at the Entity definition level. 

A listing of the columns of the Employees table in MySQL now includes the *Deployment\_Type* column added to the mapping file after execution of the application and Schema Manager at Version 1.2.

![A picture containing text, scoreboard, plaque Description automatically generated](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.009.png)


## Implementing Contained Entity Collections

An Entity Collection relationship of *Employee* to *Deployment* can now be applied in the example, implemented by adding a collection property, *EmpDeploymentsList* to *Employee* that will contain elements of type *Deployment*. Again, this can be conveniently done by *revisiting* the Entity wizard process with *Employee*. The Page Definition for the Entity will be supplemented with an additional Tab Panel containing a Table, Input Text and Button Controls to accommodate display and maintenance of the list of Deployments. Finally, the Process will be enhanced to accommodate Add/Remove Events arising from Button Controls to instantiate Deployments, populate them from the Input text Controls and Assign them to the *EmpDeploymentsList* of the *Employee* Entity.

### **Revising the Employee Entity Definition**

Begin by double-mouse-click on the ***Employee-Details.xml*** icon in the Project panel. Revision of the *Employee* definition proceeds in the same sequence as that applied previously to implement the Single Entity relationship with *Manager*, but with one essential difference; the Complex datatype of the new property will be specified as a *collection*. Proceed with the Entity wizard, as previously: select *Next*, accepting the supplied input values through all stages of the wizard process to the **Entity Properties** stage where the new collection property *EmpDeploymentList* can be added, then click ***Next***. In the next stage, to specify the datatype of the new property, select the new property then select ***Complex*** in the Data Type drop-down list. Now select the **Collection Type** to be ***List***. As before, select **Type…** in the ***Component Type*** drop-down and in the ***Select Type*** panel search-and-select *Deployment* as the Component Type of the elements in the collection. The setting of these properties is illustrated following:

**Settings for EmplDeploymentList**

|![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.89b4f6ff-ea47-4336-9b1b-6b07bd42f8cc.010.png)

Specify the Data Type as Complex, the Collection Type as List and the Component Type (for the List) to be Deployments. Note that, unlike the wizard sequence to revise the Manager definition, the sequence for Employee continues into the stage of Database Mappings. This is because, unlike the Sub-Class Manager, Employee is the keyed Super-Class.

Whereas, in the case of the Single Contained Entity in *Manager*, properties of the contained *Deployment* Entity could be added as columns of the *Employee* table by manually adding them to the Mapping File, properties of the *Deployment* Entity associated with *EmpDeploymentList* are NOT available for mapping to columns of the *Employee* table, neither by the Entity wizard nor manually.

Select ***Finish*** to exit the wizard and ***OK*** to accept replacement of the designated files affected by the changes.
### **Using Contained Entity Collections in Processe**

As with the previous example, which implemented a Single Containment of *Deployment* in *Manager*, proceed first with the Page Definition Editor to update the Page Definition used in the *EnactorEntitiesSave* Process. It will need to accommodate the new collection property providing for display of the *Deployment* list elements, capture of properties for new *Deployment* instances and Button Controls to trigger the *Add* and *Remove* Events, which invoke the associated Process Actions. 



