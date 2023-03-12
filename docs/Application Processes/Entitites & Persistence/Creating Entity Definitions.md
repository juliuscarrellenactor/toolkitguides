# Creating Entity Definitions

In a typical development context, the entities defined locally to a project will all use a common *namespace* and *prefix* and the class elements of each entity will be stored in a separate sub-package of the main package for the project.

Entities more generally applicable to the business and shared among applications will be defined at another level and provisions made for their accessibility to multiple projects and development environments as required.

For the local context, however the shared *namespace* and *prefix* are defined as public static constants in a project level class called ***PackageInfo*** used by Enactor Tools and the entity class elements stored in a sub-package, usually named in correspondence with the *prefix*. The Enactor Tools Entity Wizard discussed following assumes this structure and applies it in providing its default options.

The following discussion will explore the creation of Entities with Enactor Tools using an example based on a foundation of the already familiar Swing Application. A new project will be established using the Swing Application wizard (as used in Chapter 1) and readied for the creation and use of local entities to be persisted in a MySQL database. In the development of examples, we are interested in the essential elements of Enactor Tools required to implement a design, which applies the features under discussion.

## Creating a Database Enabled Swing Application

In preparation for the next section a new Swing Application project will be created with added database support; our discussion uses the name **EnactorEntities** for the project. In the earlier creation of a Swing Application using the Enactor Tools Wizard only a name for the application (*HelloEnactor*) was specified before selecting Finish. However, to provide for database support, after specifying the application name (*EnactorEntities*) select *Next*.

The wizard dialogue proceeds to the *Classpath Configuration* phase during which it can be indicated that the ENACTOR\_RETAIL\_LIBS are not required (uncheck the CheckBox) and select Next to proceed to the ***Add database support*** phase.

When the *Add database support* CheckBox is checked the relevant fields are enabled; select **MYSQL** from the dropdown list for the *JNDI Data Source*. Based on the Data Source the wizard supplies default values for some of the fields; the *Driver* field for the JDBC interface is provided as ***com.mysql.jdbc.Driver*** and need not be altered.

The usual assumption for Enactor Tools is that there will be a database named *enactor* and the *root* username will be used to access it without a password; this assumption will not apply for these examples. Hence, the ***Connection URL*** value must be modified from *jdbc:mysql://localhost:3306/enactor* to *jdbc:mysql://localhost:3306/**enactorentities*** and the ***Username*** and ***Password*** values set to *Enactor* and *Entities*, respectively. 

**Note** that these values correspond to the Database Name, Username and Password that were specified to the MySQL Command Prompt when creating a Database and Username in the earlier section Database Configuration Example***. These phases of the Swing Application Wizard dialogue are shown below:

|![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.001.png)

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.002.png)|

Click on Finish in the Database Configuration phase to create the application. When the wizard writes the ***enactor.xml*** configuration file for the application these Database Configuration values will populate the *Datasource* entries as described in the earlier section Enactor JNDI Configuration*** Example.

The new Swing Application can now be used to build the Entities examples. The name used for the Application (**EnactorEntities**) will also be used to identify a *package* containing the Entities, to differentiate the *namespace* and provide a *prefix*. Once Entities have been defined for the application, as described in the next section, the Schema Manager of the Enactor Runtime Framework will *automatically* create the Tables required.


## Using the Enactor Entity Wizard

Before applying the Entity Wizard prepare and define the context for entity creation as described following (the example assumes a project name of **enactorentities**):

First, create an **enactorentities** Child package under com.enactor.sample: 

Right-mouse-click on the parent package in the Projects Folder (com.enactor.sample) and select **New>Package** and extend the default value in the Name field as shown following to com.enactor.sample**.enactorentities**:

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.003.png) 
![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.004.png)

Then create the **PackageInfo.java** file in com.enactor.sample as follows:

Right-mouse-click again on the parent package in the Projects Folder (com.enactor.sample) and select **New>Class**, specify **PackageInfo** in the Name field and click on *Finish*. Once created, edit the *PackageInfo.java* file and populate the definition with constants equating to the namespace and prefix as shown in the example below:

``` java title="PackageInfo.class"

package com.enactor.sample;

public class PackageInfo {

    public static final String NSURI\_*ENACTOR\_ENTITIES* = 

    "http://www.enactor.com/*EnactorEntities*";

    public static final String PREFIX\_*ENACTOR\_ENTITIES* = "*EnactorEntities*";

}

```

![](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.005.png)

<!-- Finally, if the deployments folders **EntityMapping** and **ServerDefinition** do not already exist under the project META-INF folder, right-mouse-click on the top-level Project Folder and in the right-mouse menu use the **Enactor>Add Deployments** **Folders** option to create them as follows: -->

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.006.png)|![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.007.png)|

Project Elements Required by the Entity Wizard

The Project elements created by these preparatory steps are as illustrated at right.A PackageInfo.java file has been created in the main package and an enactorentities child package that will contain the Entities. Two folders EntityMapping and ServerDefinition have been created under the deployments folder.  The relevant elements are highlighted.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.008.png)|

The use of the Entity Wizard can now be described in an example based on the creation of a simple entity (named *Employee*) that has five attributes, one of which is a unique business key, two of which the application requires as the basis of search and filter in selections from persistence and two others, which it does not. Since the example is concerned with persisted Entities the Entity will be Keyed.

The Wizard proceeds by the stages outlined in the following section.


## Creating a Keyed Entity with the Entity Wizard

The Enactor Entity Wizard can now be applied to create the **Employee** entity as follows:

<!-- Right-mouse-click on the new entities package (com.enactor.sample**.enactorentities**), select **New>Other>Enactor Development>Entity**. The first two prompts request specification of a Generation Type and Entity Type: -->

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.009.png)|![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.010.png)|

The Entity wizard accommodates various types of Entity Generation (as per left image) involving re-definition of an existing Entity or the creation of new Entities based on other entities that have been defined in a variety of formats (Schema, Java/Dynamic or from Java Interfaces); these options will be discussed when considering the more advanced aspects of entities. In the present example Entities will be built from new. 

The Standard Entities discussed earlier in the section on Standard and Dynamic Entities*** are also referred to as **Java Entities** (as in the right-hand image), Class Entities or Entity Classes because they are defined as Java Classes; Dynamic Entities are defined as XML and will be discussed later. In the present example Entities will be Java Entities. Therefore, assume the default selection and click *Next* in both of these prompts.


### **Entity Identification**

In the next prompt the Entity wizard first requires the Entity name, which will be **Employee**. The CheckBox to *Derive names from entity name* can now be unchecked to allow reference to the *PackageInfo.java* file created earlier as the source of the *Namespace* and *Prefix*. The Entity wizard in any case obtains the target Package Name for the Entity, based on the right-mouse-click selection that invoked the wizard (com.enactor.sample.*enactorentities*). For both the Namespace and Prefix use the browse option to select the PackageInfo.java file and then mouse-click on the appropriate **Constant Field** at the bottom of the page.

**Note** that if the Entities are to be created based on a Namespace and Prefix defined elsewhere then the Browse option can be used to obtain them from the required PackageInfo.java file.

**The Entity Generator Prompt** As illustrated at right the Entity Name has been specified as ***Employee*** and the *Derive names* CheckBox unchecked allowing the use of *Browse* to obtain the *Entity Namespace* and *XML Prefix* constants from PackageInfo.java.

![Graphical user interface, text, application, emailDescription automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.011.png)

Based on the Namespace Constant and package selection the wizard obtains values for the Entity Namespace and Package Name entries.

Verify that the completed values are as shown above before selecting *Next*.

The Entity wizard automatically adds a *lastUpdated* property to the entity, which supports an Enactor builtin functionality (discussed next) and issues an informational message to that effect. Select OK to proceed to the first of the **Entity Settings** prompts, which deals with the **Entity Key**.

### **Entity Settings**

The *lastUpdated* property automatically added to the entity by the Entity wizard supports an optional Enactor builtin functionality. If this functionality is used the *lastUpdated* property of the Entity is populated with a timestamp that indicates the time the update was applied *from the Business perspective*, which may be prior to the value currently in the database. Distributed updates may be broadcast and on any given server multiple updates to the same Entity instance will be sorted (on *lastUpdated*) and only the most recent applied, if it is more recent than the value currently in the database.

If this functionality is not required, the *Timestamped* CheckBox in the Entity Settings Prompt should be unchecked. In the present Employee example however, it will be checked. 

**The Entity Settings Prompt**

As illustrated at right the Entity has been flagged as ***Keyed*** with an ***Entity*** key (business key) based on properties of the Entity and a database key of type ***GUID*** and the Timestamped CheckBox is checked to enable the builtin *LastUpdated* functionality.

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.012.png)|


Employee will have a **Business Key**, the ***Number*** property of Employee, by which an instance of the Entity can be uniquely identified at the Business Level. Therefore, for the ***Entity Key Type*** the drop-down option *Entity* can be selected (i.e. an attribute of the Entity itself is the Business Key).

If this were not the case (no meaningful attribute, or combination of attributes, of Employee exists that uniquely identifies an instance) then the unique database key would serve as the ***Entity Key Type*** and one of the drop-down options *GUID* or *Identity* would be selected. This selection therefore implicitly nominates the ***Primary Key Type*** and so the separate selection option becomes unavailable. If the Entity Key is the Primary Key, then the Business level Application Processes must engage some kind of search and selection process based on Entity properties to obtain the Primary Key and so to uniquely identify an instance of the Entity.

Entities are not necessarily persisted and if not, they are not keyed. Hence, the Keyed CheckBox would be set unchecked, in which case both Key Type selection options become unavailable. The use of Non-Keyed (Contained) Entities is discussed in a later section.

Also, on this page is the ***Keep definition file*** Checkbox. If checked the 	wizard will record all responses it receives in an XML file for later use if the Entity wizard is used to modify the Entity. Without it, all selections will need to be re-entered. This file will be created as part of the Entity definition in the project; double-mouse-click on the entry will re-initiate the wizard. For Employee leave the *Keep definition file* Checkbox checked.

The ***Process Type Name*** provides a value for the *ApplicationProcessDataType* constant that will be created in the Entity class and can be used by Actions, Processes and the Process Design Editor to obtain from the Entity itself a name by which the Entity can be uniquely and consistently referenced throughout an Application Process.

Apply settings to *Employee* as illustrated above before selecting *Next*.

### **File Generation**

At this stage the wizard has obtained all the Entity-level information required to determine what project elements will be created or modified. Elements specific to a new Entity will be created in the child package that we have created to contain this and other Entities local to the project and selected to invoke the Entity wizard.  When exercising the wizard to modify an existing Entity these files will be updated and if the files contain non-wizard customisations provision is made to merge the updates (discussed later). If the Enactor builtin Entity persistence implementation is not required or is heavily customised the designer may not wish to generate or modify all these files. The **Files to Generate** prompt (following) processes these options.

The Files to Generate Prompt

As illustrated at right the default action for creation of a new Entity is to generate the Interface and Implementation files for the Entity, the Entity Key and Entity Server. When the wizard is re-run for an Entity to apply updates or encounters existing versions of any of these files the wizard provides options to overwrite, leave or merge with existing files. This will be discussed at the end of this section.

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.013.png)|

Two other files are referenced in this prompt; the JAXB **package-info** and **Packages.xml**.

We have encountered Packages.xml previously in relation to Processes and Page Definitions and it will be dealt with in depth in the section on *Packages and Deployment*. Elements created and used by Enactor Tools are registered in this file along with directives to the Enactor Runtime Framework as to how the elements should be deployed and used. As these new or updated elements created by the Entity wizard must be registered this file will also be updated.

The JAXB Package Info file (package-info) contains package-level information applicable to all Java elements (for all Entities) in the package applicable to the java class annotations that JAXB uses when marshalling/un-marshalling objects of the class to/from XML. For example, JAXB does not, by default, apply namespace prefixes to child elements; the Enactor wizard adds to package-info an override of this default to explicitly apply the prefix that has been applied to the parent element.

In the present example accept the default options as indicated above and select *Next*. 

### **Entity Properties Nomination**

The Entity wizard now proceeds to the first stage of specification of the **Entity Properties**. This first stage provides only for the addition and removal of the property *names* in a list. After the straightforward cycle of accumulation of the list the Entity wizard proceeds to the specification of details for each property. In the entry screen illustrated below are listed the properties that should be created for the example *Employee*.

**The Entity Properties** **Prompt**

As illustrated at right the specific Java and XML characteristics for each of the Entity properties can be specified. ***Note*** that at least one property must be specified as contributing to the Entity Key. The Java and XML tabs are used to specify the respective characteristics of each property.

![Graphical user interface, application, Word Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.014.png)|

### **The Key Property**

For the example *Employee* we have previously specified the Entity Key as being of type *Entity*, i.e. being derived from (one or more) properties of the Entity (alternatively, the DB Key could have been used). At least one property must therefore be specified as the key. For *Employee* a property of data type String (Number) is specified as the (only) property that will contribute to the business key. To apply this specification, select the property, check the *Key Property* CheckBox, uncheck the *Nullable* CheckBox and specify length to be between 5 and 10 bytes.

In other circumstances multiple properties (or attributes) of the Entity may contribute to a ***composite key***. In these cases, each of the contributing properties will be CheckBox-identified as a *Key property*.

### **Java Characteristics of Entity Properties**

The Java characteristics of Entity properties are generally straightforward and self-evident and so need no detailed explanation, with the exception of Complex types. Complex Data Types are typically either collections of another type or an object of some class other than a simple data type. Having selected Complex as the Data Type several other fields become available to specify the details of the Type, which are described following.

#### **Complex Data Type Properties**

|![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.015.png)

If a Complex Data Type is a *Collection* the ***Collection Type*** is specified as something other than ‘*None’*; the options are as shown here:

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.016.png)

If *Map* or *EnumMap* is selected, these Collection Types can be Keyed, and so the ***Key Type*** field becomes available for entry.

The Component Type specifies the Data Type of the components of the collection (or of the individual element if the Collection Type is ‘*None’*). **Note** that specifying Data Type Complex, Collection Type *None* and setting Component Type to some simple type is no different to specifying Data Type itself to the same simple data type. Other field options specify how the item or components should be initialised and if Null value is allowed. 

For the example Employee specify the Java characteristics for properties as follows:

|Property|Settings|
| :- | :- |
|LastUpdated|Leave default as Date type and Nullable|
|Number| Set as Key Property, Integer values 0-100,000 not nullable
|Surname|String type 5 to 100 characters not nullable|
|StartYear|Integer values 1900-2100 not nullable|
|JobTitle|String type 5 to 100 characters not nullable|
|HomeEmail|String type 5 to 100 characters not nullable|


### **XML Characteristics of Entity Properties**

The XML Tab of the Entity Properties page accepts information that provides a description of the **Entity XML** (i.e. an internal Schema representation of the XML for the Entity).

|![Graphical user interface, text Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.017.png)

**The Entity XML**

Entity Properties typically are basic XML Elements for which the Element Name and Data Type are derived from the property.This panel therefore rarely needs to be visited. Note that “*Required in XML*” does NOT pertain to inclusion of the property in the XML block (if any) that is saved in the table, it refers to the Element or Attribute being assigned as mandatory (MinOccurs on an element or ‘required’ on an Attribute) in the schema.|

Enactor uses this representation of the **Entity XML** to generate *Standard* Entity Classes; in particular, to write the Java annotations that will be used by JAXB at runtime. Enactor alternatively uses it to generate an XML description for *Dynamic* Entities, from which the Enactor Runtime creates an Entity class.


#### **Utilisation of JAXB by Enactor Entities**
JAXB offers the bi-directional capability to instantiate an Entity class from an XML representation of an instance, or to generate an XML representation of an Entity instance. JAXB also offers facility to generate an XML Schema.XSD file from an annotated Java class. Enactor uses JAXB for runtime marshalling and un-marshalling and to generate Entity XML Schema.XSD files for customer and external use. These operations are illustrated in the following diagram: 

![Diagram Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.018.png)

#### **Entity XML Description**
The Mapping Type dropdown list options describe the property name and value relations to the XML element, attribute or value as follows:

<!-- ``` xml title="optional"

**Option** **Meaning**

|ELEMENT|<***your-property-name***>***your-property-value***</*property-name*>|
|ATTRIBUTE|<tagname ***property-name***=***property-value**>*</tagname>|
|VALUE| <*EntityRoot*>    `{  <tagname>element-value</tagname> … } </p><p>`     `***your-property-value*** </*EntityRoot* >
|TRANSIENT|This property is not mapped into the XML

``` -->

### **Specifying Database Mappings**

The Database Mappings phase (illustrated following) provides for selection of properties for inclusion in database table columns and for specifying some aspects of how the columns are used.  Properties may be individually or collectively added or removed from the list to be mapped to table columns (typically, add all then selectively remove). The Column Name, type and size may all be derived from the property specifications or specified explicitly (after unchecking the CheckBox). 

Four CheckBoxes pertain to the use of column-mapped properties by builtin facilities of the Enactor Framework; the first two relating to Listing Functionality, which is discussed in a later chapter. Column-mapped properties that are flagged with either of these CheckBoxes will be applicable to Listing Functionality, those with ***Include in List Methods*** set true will be presented in lists and those flagged for ***Include in Filters*** will be defined as filters and available as selection criteria to Listing Functionality.

A ‘*Last\_Updated*’ property is included in the Entity by default and if not subsequently removed will also be flagged ***Use as Last Updated Date***. When enabled in this way the Enactor Framework automatically records the current date in this property on each update.

**The Database Mappings Prompt**

This page provides for the specification of properties for mapping to columns of the database Table in which the Entity is persisted. It also provides for specification of how the column-mapped properties will be used in builtin facilities of the enactor framework. Properties not stored in separate columns may be stored as XML, or not persisted at all.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.019.png)

#### **The XML Column**

The ***Add an XML column*** CheckBox of this page provides that all properties of the Entity (other than any properties set to **TRANSIENT** as XML characteristic in the previous stage) will be included in a block of XML marshalled by JAXB and stored in this column. By default, the Entity wizard provides for JAXB annotations for all properties of the Entity. **Note** that properties set to TRANSIENT, although not included in the XML, may nevertheless be mapped to columns during this stage. In the present example Employee, no properties have been set as TRANSIENT, the ***Add an XML column*** CheckBox will be left checked and so all properties of the Entity, including the two properties just removed from the database mappings list, will be included in the XML. 
#### **Allow Mapping of Inherited Properties**
In the next chapter it will be seen that Entities, like other Java classes, can be sub-classed and the super-class may or may not be another Entity. If not, then it may be desirable to check the ***Allow Mapping of Inherited Properties*** CheckBox. All properties of the sub-class, and those of the super-class (subject to JAXB annotations in the superclass) will, by default, be mapped to XML (subject to the *Add an XML Column* flag mentioned above).

The settings applied to these columns are specified and explained in the following table:

|Property|Settings|
| :- | :- |
|Last\_Updated|This standard property added by the Entity wizard relates to builtin functionality and is already flagged for ***Use as Last Update Date***.|
|Number|The business key field; mapped to a column. Set to ***Include in List methods***, which means that standard list processing of the entity will include it and ***Include in Filter***, which means that it may be applied in SQL ‘where’ clauses.|
|Surname|Mapped to a column, this property is also set to *Include in List methods* and *Include in Filter*. In addition, this property is flagged ***Use as Description***, taken to describe the instance.|
|StartYear|Mapped to a column and set to *Include in List methods* and *Include in Filter*.|

The last CheckBox, ***Allow mapping of inherited property*** will be discussed later in this chapter.
### **Additional Database Settings**

|![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.020.png)

**Additional Database Settings** If not *Derived*, the Table Name could be set to be other than the Entity name.  If *Record time of updates* is checked a *Timestamp* column is added and maintained to contain the time an update was applied to the database (unrelated to *LastUpdated*). The *Order By Sequence* specifies the properties to be included in list sorting and the heirarchy of their level in sort. 

For the example *Employee* apply the settings shown above and click *Next*.

### **Additional XML Settings**

|![Graphical user interface, text Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.021.png)

**Additional XML Settings**

If not *Derived*, the ***XML Type Name*** (Root Element) could be set to be other than the Entity name. The XML Element *Order* specifies the sequence of properties in the XML.

This is the last stage of the Entity Wizard. After specifying Additional XML Settings shown above select *Finish* to create the Entity elements and exit the wizard.

### **File Creation and Modification**
As mentioned under File Generation the Entity wizard creates new files or modifies existing files; if an existing file is to be modified the wizard offers options to Replace, Leave or Merge with the existing file as shown below:

![A picture containing application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.022.png)

In the present example, although a new Entity is being created, the new Entity must be registered in the (existing) Packages.xml file that was created by the Swing Application wizard. **Note** that in this case the Entity wizard has processed the existing Packages.xml file into an internal model, into which it has added the new Entity registration. If any elements of customisation (such as comments for example) are not included in the internal model they will be excluded from the new file. The Merge option can be used to inspect updates.

#### **Using the Merge Option**

The Merge option of the Entity wizard provides a side-by-side text comparison of the existing and generated file with links connecting the old and new versions of elements that have changed. The right-mouse-click menu of the page space offers an option to ignore whitespace changes, which may sometimes improve clarity. The icons at the top-right-hand corner of the window (![](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.023.png)) provide the following options:

- Merge All changes from the Generated file (right) into the existing file (left)
- Merge the currently selected change from the Generated into the existing file
- Go to the next element of difference
- Go to the previous element of difference
- Go to the next change within an element of difference
- Go to the previous change within an element of difference

If the File Merge facility is exit using Commit the current state of the left window will replace the existing file; if exit using Cancel control is returned to the Replace/Leave/Merge options prompt as shown above.


#### **Entity Files Created**

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.1f065268-8ca6-47bd-8b02-c298b8f24382.024.png)

**Entity Files Created**The Entity wizard has created Interface and Implementation files for each of the Entity, Key and Server classes, a JAXB package-info file, an ORM Mapping File and an Entity Server definition file, as illustrated at left.

**Note** that double-mouse-click on the Entity details definition file ***Employee-Details.xml*** will re-launch the Entity wizard to modify the Entity. All information that was provided to the previous Entity creation session will be used to supply default responses throughout the update session.



