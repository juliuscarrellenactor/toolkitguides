## Creating a New Application Process

The **Application Process** **Wizard** is available in the Enactor ToolSet to create new Application Processes. To create the new Application Process in the correct location within the Application deployments folder Right-mouse-click on the <applicationName> folder under ***META-INF/deployments/Process/*** (in the example case, HelloEnactor) and select ***New>Other…***, expand the **Enactor Development** folder and select the **Application Process** wizard as shown here:

|![Graphical user interface, text, application

Description automatically generated](Aspose.Words.10ebd019-ce92-4563-aab3-b8f98ca85dac.001.png)|![Graphical user interface, text, application, email

Description automatically generated](Aspose.Words.10ebd019-ce92-4563-aab3-b8f98ca85dac.002.png)|
| :- | :- |
Selecting ***Next*** presents the **Process Settings** panel as shown below. In the Process Settings panel specify a Name for the Process in the Process ID field and if necessary, use the Browse Option to specify the Container: **src/META-INF/deployments/Process/<***applicationName***>/<***applicationName***>**.

|![Graphical user interface, text, application, email

Description automatically generated](Aspose.Words.10ebd019-ce92-4563-aab3-b8f98ca85dac.003.png)|<p>A new Application Process is then created in the Deployments/Process folder for the Application:</p><p>![Graphical user interface, text, application

Description automatically generated](Aspose.Words.10ebd019-ce92-4563-aab3-b8f98ca85dac.004.png)</p>|
| :- | :- |

### **Packages Registration**
Processes must be registered in the Packages.xml of Applications that use them. The new **Application Process** template created by the Wizard is automatically registered in the Packages file by the Wizard. However, Processes may also be manually registered by selecting them in the Project Explorer perspective and using the Right-mouse Meny Option Enactor>Register in Packages, which will create an xml Element in the Packages file of the form shown in the example below:

<core:packageProcess>

`	`<core:processId>HelloEnactor/**ModifyMessage**</core:processId>

`	`<core:name>**Modify Message**</core:name>

`	`<core:version>1.0</core:version>

</core:packageProcess>

![](Aspose.Words.10ebd019-ce92-4563-aab3-b8f98ca85dac.005.png)


