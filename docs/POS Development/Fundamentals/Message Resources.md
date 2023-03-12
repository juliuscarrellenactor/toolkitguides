# Using Message Resources

The use of **Message Codes** indirection to provide text elements for Labels, Messages and other text content required in an Application allows that the text can be maintained, preferably in a central location, without engineering changes. In the Enactor ToolSet this indirection is readily accommodated using **Message Resources**.

Another advantage of *Message Codes* indirection is that it provides for convenient **Regionalisation** of the application presentation based on a **Locale**, which can be used to select a set of *Message Codes* according to the requirements of a specific Region, Location or individual User. Helpfully, Java provides builtin facilities for Internationalization and Localization based on ISO Standards, which provides a comprehensive set of codes for country and language codes from ISO 3166 and ISO 639, respectively.

The Enactor ToolSet aligns with Java Internationalisation and provides for Regionalisation of its *Message Resources* based on an internally defined *Locale*, which uses an underlying Java Locale and so, also conforms to ISO Standards for country and language codes. The ToolSet also takes full advantage of the Java builtin facilities for establishment of a default Locale at Application Startup and in the use of the Java API for Locale based resolution of *Message Resources* at load time.
## Message Resources
Message Resources are XML files stored in the Application ***META-INF*** folder under:
*deployments/MessageResource/**YourApplication-Name**.
The Swing Application Wizard creates a **Default Message Resource** for the application, which is:
*deployments/MessageResource/**YourApplication-Name>/**YourApplication-Name>Messages.xml**.*
The Default Message Resource file name corresponds to the **Base Name** used to reference the Message Resource and this file is always used if a nominated, locale-specific file is not available. The Locale Specific xml file names are suffixed with the Locale as follows:

- ***BaseName***.xml (the default file)
- ***BaseName***\_**language>\_**country>\_***variant>.xml

Where ***language*** and ***country*** are two-character instances of ISO 639 and ISO 3166 respectively.

The Message Resource xml file specifies the Base Name and Locale in the *core:basename* and *core:localekey* elements, which if specified, may be used for key specification if the Message Resource is loaded into a database table; a requirement out of scope of this book. Message texts are added as the data content of *core:message* elements with a Key attribute that provides the **Message Code** as shown in the example below in which the added Message Code is *GREETING*.

![A screenshot of a computer Description automatically generated](./Images/Aspose.Words.95ee5809-faff-4962-89e9-1b225baf67c2.001.png)

### **Creating Message Resources**
When an Application is created using the Swing Application Wizard a template Message Resource is created for the Application, as shown above, with a ***Base Name*** derived from the ***Application-name> and to which new Message Code elements can be added. The example Application described in the next section illustrates the creation and use of Message Resources.

The Message Resource from which to resolve Message Codes at runtime is specified for the execution context using the ***Base Name***. Therefore, either a single Message Resource may be shared among Applications or the Messages of different parts of an Application may be segregated into different Message Resources according to Design requirements or preference. 

If different Message Resources are required in an Application, the ***Message Resource Wizard*** can be used to create new, Default Message Resources with a specified ***Base Name***. To do this, right-mouse-click on the ***Application-name> folder under *deployments/MessageResource* in the Project Explorer perspective and select New>Other> then select Message Resource from the Enactor Development folder.

#### **Locale-Specific Message Resources**

When the Design is complete, all required Message Codes have been added to the file and the time has come to consider Language Variants for the set of defined Message Codes, new, Locale-specific instances of the Default Message Resource file can be created using the same set of Message Codes with values modified for the Locale. To do this use the Eclipse Copy and Paste. For the Copy phase, right-mouse-click on the Default Message Resource for which the variant is required and select the **Copy** Option. For the Paste phase, select and right-mouse-click on the *deployments/MessageResource* folder under META-INF and select **Paste**. A ***Name Conflict*** resolution panel is presented in which the Designer can append the ***Locale Suffix*** to the Filename using the two-character ISO Codes for Language and Country. For example, ****MyApp>Messages* becomes ****MyApp>Messages*\_fr\_FR to create a French Language instance. Any arbitrary value can be used to specify a Locale Variation (\_fr\_FR\_***variant>).

When the new instance has been created, double-mouse-click on the new Message Resource in the Project Explorer perspective and the XML file will open for edit. **Note**: It may be necessary to delete the Locale from the value provided for the basename property. The Message elements may now be modified to the required language.
## Using Message Resources
Message Code Resolution occurs against a Message Resource selected either specifically for the individual operation or for a Processing Context in which it occurs in three Enactor Tools Contexts: Page Definitions, EL Expressions and Actions, as described in the following subsections.

**Note** that Message Resources are always specified in terms of the Message Resource ***Base Name*** only. Selection of a Locale-specific file, based on that *Base Name*, is deferred to the Runtime Framework. See the discussion following in section ***Loading Message Resources***.

### **Message Code Resolution in Page Definitions**
The most common usage context of Message Code Resolution is in Page Definitions, where the Locale Dependency aspect is prominent. The Page Definition has a **Default Message Resource** property at the Page level, which requires a relative URL reference to a Message Resource. For example, the template Message Resource ****Application-name>/***Application-name>Messages* created by the Swing Application Wizard is referenced as the Default Message Resource in the Page Definition included as part of the template Application; ****Application-name>Prompt*.

#### **Individual Controls**

Individual Controls in the Page Definition have a **Message Base** property, giving the Designer control of Message Resource usage down to the level of the individual control.

#### **Dynamic Message Resource Specification**

The Value specification for either of these properties (Default Message Resource or Message Base) may reference an Input Data Item of the Prompt State using an EL Expression of the form #{inputItem}, which may be entered manually or by invoking the Expression Builder using the Elipsis Icon at the right-hand side of the Property Value Field.

### **Message Code Resolution in EL Expressions**

The built in Simple Functions Library available in the Expression Builder includes a number of Message Code Resolution Functions that may be used in Expressions. Their features are described following:

#### **resolveMessage(baseName,messageId)**

This function attempts to resolve the specified ***messageId*** in either a Locale-dependent Message Resource or the Default Message Resource matching the specified ***baseName***. The function uses the Java default Locale for the Locale-dependent Message Resource search (not the enactor userLocale).
#### **resolveLocaleMessage(baseName,messageId,locale,defaultValue)**
This function attempts to resolve the specified ***messageId*** in either a Locale-dependent Message Resource or the Default Message Resource matching the specified ***locale*** and ***baseName***. The function uses the specified Locale for the Locale-dependent Message Resource search, which may be specified using the Java Locale property of the enactor User Locale specified as *userLocale.locale*.

#### **resolveMessageQuiet(baseName,messageId)**

#### **resolveMessageWithVariables(baseName,messageId,variables)**

This function, similar to the resolveMessage Function, attempts to resolve the specified ***messageId*** in either a Locale-dependent Message Resource or the Default Message Resource matching the specified ***baseName***. The function uses the Java Default Locale for the Locale-dependent Message Resource search (not the enactor userLocale). The function will attempt to resolve any variable references embedded in the Message Code resolution text, which have the form *{***variable-name>}* with the value of any matching ****variable-name>*s in the ***Variables*** list of arguments.


### **Message Code Resolution in Actions and Classes**

Message Codes are not normally passed as Input Data Items or hard-coded to be resolved within Action Classes. Instead, a specific, built-in Action ***GetMessageAction*** is used at the Process level to resolve the Message Code first and the Text Value returned is then passed as an Input Data Item to the Action that will use it, which is typically a ***UILogMessageAction***, since this is the construct normally used to write Application Messages to the logfile.

## Loading Message Resources

In all of the Use Cases described above Message Resources are always specified in terms of the Message Resource ***Base Name*** only. The Runtime Framework loads a Locale-specific file, based on the supplied *Base Name*, if available. If no Locale-Specific file is found the Default (BaseName.xml) File will be loaded.

### **The Use of Locale**

At Runtime, Locale is used in Message Resource selection, as selected by the Framework and depending on the context. 

In Page Definitions the *enactor.coreUI.UserLocale* obtained from the View is always used, if available, otherwise the Java Built-in default Locale is used. 

In EL Expressions, the Functions that provide Message Code Resolution always use the Java Built-in default Locale, with the exception of the *resolveLocaleMessage* Function, for which the application must supply a *java.util.Locale* typed argument. **Note**: To use the User Locale, this argument may be specified using *enactor.coreUI.UserLocale.locale*, which provides the Java typed *java.util.Locale* property of the Enactor User Locale. 

The Enactor Built-in *getMessageAction* allows for optional specification of a UserLocale Input, which is the Enactor Built-in User Locale of type com.enactor.core.localisation.ILocale.

In all cases, the Java Built-in Internationalisation functionality is then applied using this Locale to load a matching, Locale-Specific file, if available or the default BaseName.xml otherwise.


### **Referencing Message Codes**

In Page Definitions, the Tools offer Design assistance facilities to support the use of Message Codes from Message Resources. For elements that require text, either as a literal value or from a Message Resource, separate properties are offered. For example, in the Page Properties, the Designer may specify either *Title* (as literal text) or *TitleMessageId* (using a Message Code). For individual Controls such as Labels, the Designer may specify either *Value* (as literal text) or *MessageId* (using a Message Code). These separate properties provide appropriate Design assistance facilities as follows:

#### **Entering Text Values**

If the text property input field offers the Ellipsis Icon (![](./Images/Aspose.Words.95ee5809-faff-4962-89e9-1b225baf67c2.002.png)) at the right-hand side of the field, the Designer may enter text manually or select the Icon to access the Expression Builder, in which one of the Prompt Input Items available to the Page Definition may be selected to insert an expression of the form #{***Input-Item>}

#### **Entering Message Codes**

If the message Id property input field offers the Dropdown Icon (![](./Images/Aspose.Words.95ee5809-faff-4962-89e9-1b225baf67c2.003.png)) at the right-hand side of the field, the Designer may use the Icon to select a Message Code from the list offered. If a valid Message Base is specified either for the Control or in the Default Message Resource property the Dropdown List will contain all Message Codes from the Message Resource, otherwise the list will not be populated.

**Note** that if the Message Resource is unspecified, or is specified dynamically (based on a Prompt State Input Data Item), the required list of Message Codes will not be available at design time but may be manually keyed.

In EL Expressions, the resolveMessage Functions require a baseName and messageID argument, which must be specified literally as a quoted string (e.g. Base Name 'MessageCodes/MessageCodesMessages' and Message Code 'GREETING').

In the getMessageAction the MessageBasename and MessageId Input Data Items must similarly translate to a literal string value. For example, if specified as Input Parameters, the Value field may be entered as string values without quotation marks.

## Using Message Resources

The ***MessageCodes*** example described here (downloadable from the Enactor Website) illustrate the use of Message Resources and Locale-dependent variants of them to resolve Message Codes used in the three supported contexts: Page Definitions, EL Expressions using the resolveMessage Functions and in the getMessageAction. The example is designed based on the ‘Hello Enactor’ template Application created by the Swing Application Wizard. The different usage options demonstrated are selected based on specifin Name values being entered to the Main Prompt as follows:

- ***AAAAA*** selects the normal, unaltered functionality of the Template Application, which makes no use of Message Resources. For all other options the ***SpecifyLocale*** Subprocess is called to select a Country and Language, create a Locale and save it to the View Data for use in resolving Message Codes.
- ***BBBBB*** selects an action to format the Country and Language that has been saved to the View Data into the Message returned to the Main Prompt.
- ***CCCCC*** selects functionality, which demonstrates the use of Message Resources in Page Definitions. A Prompt is used based on a Page Definition that makes use of Message Codes. 
- ***DDDDD*** selects functionality, which demonstrates the use of getMessageAction, which uses Message Resources to resolve a Message Code requiring Variable Insertion and uses logMessageAction to write the resolved message to the logfile before delivering a normal User response. 
- ***EEEEE*** selects functionality, which applies the resolveMessageWithVariables Function to construct a User response Message using Message Resources and a Message Code requiring Variable Insertion. 
- ***All Other Input Values*** select functionality, which applies the resolveLocaleMessage Function to construct the same User response Message of the Template Application based on a Message Code that enables Locale sensitivity.

### Adding Locale Selection

Locale Selection uses a SpecifyLocalePrompt Page Definition in a Called Subprocess, SpecifyLocale.

#### **Create the SpecifyLocale Subprocess**

After creating the MessageCodes Application using the Swing Application Wizard, use the Application Process Wizard to add a ***SelectLocale*** Process to the Application. This Process has optional Inputs *Country*, *Language* and *Variant*, which it also returns as Outputs. It will also return a *Locale*, which it constructs based on the Country and Language input by the User.

Example – Iteration Using an Iterator State

***core:message key="LOG\_GREETING">This is a Hello entry in the logfile for: {name} Message Resolution using {userLocale.country}-{userLocale.language}-{userLocale.variant}***/core:messageß>

2020-02-06 14:32:54.833 [AWT-EventQueue-0] WARN Process.MessageCodes.MessageCodesStartupProcess - This is a Hello entry in the logfile for: DDDDD Message Resolution using GB-en-:Execute Action:'LogMessageAction' State:'Main Prompt' Process:'MessageCodes/MessageCodesStartupProcess' 

2020-02-06 14:33:39.276 [AWT-EventQueue-0] WARN Process.MessageCodes.MessageCodesStartupProcess - Dies ist ein Hello-Eintrag in der Protokolldatei für: DDDDD Nachrichtenauflösung mit DE-de-:Execute Action:'LogMessageAction' State:'Main Prompt' Process:'MessageCodes/MessageCodesStartupProcess' 

2020-02-06 14:34:31.502 [AWT-EventQueue-0] WARN Process.MessageCodes.MessageCodesStartupProcess - Il sagit dune entrée Bonjour dans le fichier journal pour: DDDDD Résolution des messages à laide de 1-2-3:Execute Action:'LogMessageAction' State:'Main Prompt' Process:'MessageCodes/MessageCodesStartupProcess' 


