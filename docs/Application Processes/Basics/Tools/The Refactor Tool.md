# The Refactor Tool

The **Refactor** tool of the Enactor ToolSet provides convenient means to modularise an existing Application Process based on a Call Processes Action and the extraction of a suitable part of the functionality into a new Application Process. This is often useful when the Process Design canvas of an Application Process becomes too busy, or when an area of function within the Application Process emerges as a distinct and possibly re-usable design element. Being visually identified as a distinct function makes both the refactored Process and the Process from which it will now be called easier to interpret and understand. 

All of the State and Action elements to be included in the Refactor operation must be selected. To select multiple Icons, hold down the CTRL Key whilst using mouse-click to select each Icon for inclusion (or to deselect, or mouse-click without the CTRL Key to deselect all). The ***Marquee*** function available in the Tools Palette provides a simpler means to make the selection. Ideally, it’s best to rearrange the Canvas to bring together all of the elements to be refactored, allowing the end result to be better anticipated.

To invoke the ***Refactor*** operation, right-mouse-click in one of the selected Icons to obtain the Right-mouse menu and select Refactor. After warning and confirmation, the tool removes all of the selected Icons to create a new Application Process and replaces them in the source Process with a single Call Process Action that references the new Process. **Note**: *The Refactor operation is not subject to **undo**!* The ***Process Flow*** of the source Application is managed by addressing all *Process Flow* elements that cross the boundary of the refactoring selection. The following logic is applied to *Process Flows* into and out of the New Application Process and the Call Process Action, respectively:

## **The New Application Process**

### **Process Flows In**
- If there is only one Incoming Flow this is used automatically, otherwise, the Designer is prompted to select one of the Incoming Flows as the Primary Incoming Flow.
- If the Primary Incoming Flow is an Action a new State is added and becomes the ***Entry Point***. Otherwise, the State target of the Primary Incoming Flow becomes the *Entry Point*.
- For all other Incoming Flows, a new ***Null Action*** is added to the new Proces as a starting point.
  These Null actions serve as an indicator to the Designer that these loose ends need to be addressed in the new Process.
### **Process Flows Out**
- All outbound Process Flows are directed to a new ***End Process Action*** created in the new Process and each is assigned a ***Process Outcome***, which is used to identify it in the Call Process.
## **The Call Process Action**

### **Process Flows In**
- All inbound *Process Flows* now become endpoints of Process Flows to the Call Process.
### **Process Flows Out**
- All of the outbound Process Flows, which now correspond to End Process Actions and ***Outcomes*** within the new Called Process, are also represented as *Outcomes* in the Call Process from which the original Process Flows now emanate.

