# Installing the Eclipse Plugins
The Enactor tools are supplied as plugins to the Eclipse IDE. The easiest way to install them is from the Update Site which is located at: <https://dev.enactor.co.uk/tools/current>.

## **Installing Eclipse**
Download the Eclipse installer from: <https://www.eclipse.org/downloads> and using the installer select the option: Eclipse IDE for Enterprise Java Developers.

## **Enactor Eclipse Update Site**
Start Eclipse and from the main menu bar select *Help – Install New Software….* The exact location of this option in the Eclipse UI may vary depending on what operating system you are running.

In the “Work with” input box key in the location of the Enactor Update Site, which is: <https://dev.enactor.co.uk/tools/current>.


![A screenshot of a social media post

Description automatically generated](Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.009.png)

Select all the check boxes and press *Next*. You will then be asked to accept the licence terms and then after installation will be prompted to re-boot Eclipse.

## **Installing an Enactor Eclipse Licence**
In order to activate the plugins you will need an Enactor licence key. Contact: <info@enactor.co.uk>. The licence key is an xml file that will be sent to you along with a user and logon for you to use in order to gain access to Enactor’s Artifactory and Maven Repository.

When you have received the file press Install New Licence and select the file you have been sent.

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.010.png)


You should see the following:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.011.png)

Remember to restart Eclipse!

## **Testing your installation**
To test the installation we will make a quick project. But first we need to set up the build management system, Maven, so that the project dependencies can be downloaded from the Enactor’s Artifactory and Maven Repository.

### Quickly setting up Maven
In order to activate the plugins you will need to configure a *settings.xml* file *in Eclipse – Preferences…* then *Maven – User Settings*. For example:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.012.png)


Here is an example settings.xml file:



In the above file note the changes that you will need to make:

1. The username and password values need to be set to the user and password details sent to you by Enactor in order to gain access to our repositories.

1. <localRepository>xxxxx</localRepository> needs to be set to where your existing Maven repository is located or where you want it to be located on your local PC.


### Making a simple application
We can make a simple application by using the Swing application wizard that comes with the Enactor tools. Select *File – New – Other…* and then select Swing *Application*:

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.013.png)


You should see the following screen. Key in an Application Name, for example “Test Swing Application”:

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.014.png)

Press Next and on the following screen you will be prompted for the “Enactor Platform Version”. This is the version of the Enactor runtime jars that the application will use. The version at the time of writing this guide is 2.6.222.18. Select *Finish*.

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.015.png)

You should see the project created in Project Explorer and if you expand the *src* folder you will see the components that have been made:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.016.png)


### Application Contents
The main elements are:

1. A java application class called *TestSwingApplication.java*. This launches the main application process.

1. An Application Process called *TestSwingApplicationStartupProcess.xml*.

1. A wireframe page definition for the prompt that displays called *TestSwingApplicationPrompt.xml*.

1. A messages file for locale based translations called *TestSwingApplicationMessages.xml*.



This is the Application Process:

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.017.png)


This is the wireframe Page Definition:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.018.png)

### Running the application
You can run this application in the normal way that a Java application is launched in Eclipse. Select the *TestSwingApplication.java* file in Project Explorer and right click and select Run As – Java Application. You should see a screen that looks like the below. Type in your name and press the *Say Hello* button:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.652cac3e-57f9-4efd-a8b5-b2c1f3333ce1.019.png)

