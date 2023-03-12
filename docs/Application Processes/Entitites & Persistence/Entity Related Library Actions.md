# Entity-Related Library Actions

### **Entity Identification**

The Entity and EntityKey classes are instantiated by **Entity Factories**. By this means a single pair of classes (CreateEntityKeyAction and CreateEntityAction) may serve as Application runtime entry points to the Entity-related aspects of the Enactor infrastructure. These Actions identify Entities only by their EntityName and EntityNamespace, which are registered at design-time and serve as the (unique) look-up key by which the correct Entity Factory is identified and exercised. The objects generated conform to interfaces known to builtin Entity and Keyed Entity persistence elements of the Enactor infrastructure.
### **CreateEntityKeyAction**

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.11dfb4a4-ef8a-4c4a-bec8-fe85826bccac.001.png)

**Description**

The CreateEntityKeyAction returns an Entity Key object. The True or False Outcome.

Inputs

See Entity Idenitfication.

Outputs

The Entity Key instance. Outcomes Success, if the Entity Key is successfully instantiated. Usage Notes None.

### **CreateEntityAction**

|![Graphical user interface, application

Description automatically generated](Aspose.Words.11dfb4a4-ef8a-4c4a-bec8-fe85826bccac.002.png) **Description** The CreateEntityAction returns an Entity object. The True or False Outcome. Inputs See Entity Idenitfication. Outputs The Entity instance. Outcomes Success, if the Entity is successfully instantiated. Usage Notes None.


### **CheckEntityExists**

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.11dfb4a4-ef8a-4c4a-bec8-fe85826bccac.003.png)

**Description** 

The CheckEntityExists Action returns a True or False Outcome depending on the existence of the supplied Key. However, it serves a role in the management of Process Flow. It provides a convenient point of convergence for Process Flow from the outcomes of multiple actions (where a common condition test may be then applied once-only in EL). Conversely, where multiple lines of Process Flow may emerge from a single outcome of an action (based on multiple EL condition tests) the flow may be more readable as a chain of Null Actions, each testing one of the conditions. This may be necessary if a particular order of testing of the conditions must be enforced, which is not possible using multiple conditional flow lines from the same Action outcome. Inputs The Entity Key. Outputs None. Outcomes True or False indicating existence of the Entity of the specified Key. Usage Notes None.


### **loadEntityAction**

|![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.11dfb4a4-ef8a-4c4a-bec8-fe85826bccac.004.png)

**Description** 

The loadEntityAction returns an Entity from persistence based on the supplied Key returning the Success Outcome if the Entity has been successfully loaded.

Inputs

The Entity Key

Outputs

The loaded Entity.

Outcomes Success, if the Entity is loaded. 

Usage Notes

If the Entity of the specified Key is not found loadEntity throws an exception.


### **loadEntityLenient**

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.11dfb4a4-ef8a-4c4a-bec8-fe85826bccac.005.png)

**Description**

The loadEntityLenient Action returns an Entity from persistence based on the supplied Key. The True or False Outcome.</p><p>Inputs</p><p>The Entity Key.

Outputs

The loaded Entity. 

Outcomes Success, if the Entity is loaded. NoSuchRecord if the Entity corresponding to the specified Key is not found. InputEmpty indicates no Key has been supplied.

Usage Notes None.

### **SaveEntityAction**

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.11dfb4a4-ef8a-4c4a-bec8-fe85826bccac.006.png)

**Description**

The SaveEntityAction saves the input Entity to persistence.

Inputs

The Entity to be saved to persistence.

Outputs 

None.

Outcomes 

Success, if the Entity is successfully persisted or updated.

Usage Notes 

None.

### **DeleteEntityAction**

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.11dfb4a4-ef8a-4c4a-bec8-fe85826bccac.007.png)

**Description**

The DeleteEntityAction deletes the Entity associated with the input Entity key from persistence.

Inputs

The (populated) Entity Key of the Entity to be deleted.

Outputs 

None.

Outcomes 

Success, if the Entity is successfully deleted. 

Usage Notes 

None

