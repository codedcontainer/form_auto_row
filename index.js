var formAddInputRow = function() {
        var self = this; //$ has it's own 'this'
        this.inputTypes = ['textarea', 'input', 'select']; 
        this.groupTag = 'repeat-group';
        this.formParentTag = 'pickup-inventory-form'; 
        //constructor method, runs automatically.
        this.init = function(self) {
            //continue only if the following node exists in the document. 
            if ( this.nodeExists(this.formParentTag) == true ){
                this.dataSetDefault(); 
                this.repeatGroup = document.getElementsByClassName(this.goupTag);
                this.formGroupLength = this.repeatGroup.length;
                this.inputFocus(self);
            }
        };
       
        //does the form group, ie repeat-group exists. If so then we will set our variables
        this.nodeExists = function(nodeName){
            if (document.getElementById(nodeName) == null ){
               return false; 
            }
            else{
                return true;
            }
        };
        //gets the current index of the group when a form element is focused
        this.groupIndex = function(formGroup) {
            var groupIndex = formGroup.getAttribute('data-num');
            return parseInt(groupIndex); //integer
        };
        //determine the number of rows are current on the page and adds 1 when a row is appended. 
        this.numberOfRows = function(){
            var childrenNodeLength = document.getElementById(this.formParentTag).children.length;
            childrenNodeLength -= 1; //subtract one from the value if there are arbitrary nodes
            return childrenNodeLength; 
        }; 
        // places all of the form types in an array based on the inputTypes criteria
        this.loopFormTypes = function(parent){
            var masterArray = []; 
            for ( var a = 0; a <= this.inputTypes.length - 1; a ++){
                 masterArray.push ( parent.getElementsByTagName ( this.inputTypes[a] ) );
            }
            return masterArray; 
        }
          //loops through the number of inputs in the row and does something
        this.inputLoop = function(row, setEmptyArrayVals){
           for( a = 0; a <= row.length - 1; a++){
                setEmptyArrayVals(); //custom function
           }
        }

        //if the group does not have a checked value, or if the input does not
        //contain a value then add data-set= "false"
        this.dataSet = function(node, bool){
            node.setAttribute('data-set', bool); 
        }
        //set all of the inputs to have a data-set of false
        this.dataSetDefault = function(){
            var inputs = document.getElementById('repeat-group');
            inputs = this.loopFormTypes(inputs);
            self.inputLoop(inputs, setFalse); 

            function setFalse(){
                if ( inputs[a].length > 1 )
                     {
                        //if there are a group in inputs such as input = text then go through
                        //each one and see if it is empty or has a value
                        for ( b = 0; b <= inputs[a].length -1; b++)
                        {
                              //console.log(self.inputs[a][b].getAttribute('type'));
                              if ( inputs[a][b].getAttribute('type') == 'radio')
                              {
                                if ( inputs[a][b].checked == false)
                                {
                                    self.dataSet(inputs[a][b], false); 
                                }
                                else
                                {
                                    // do nothing values already set
                                }
                              }
                            if (inputs[a][b].value == "") 
                            { 
                                self.dataSet(inputs[a][b], false); 
                            }
                        }
                    }
                    else 
                    { 
                        if ( inputs[a].length !== 0 && inputs[a][0].value == "")  //again if there is only one input type in array then
                        { 
                           self.dataSet(inputs[a], false); 
                        }
                        
                    }
            }
        }

        this.inputFocus = function(self) {
           
            //we want to get the parent of the input group instead 
            //of just the input so that we can still use this function
            //after a new input row has been generated. 
            var parentGroup = document.getElementById(this.formParentTag);
            var groupInputValArray; 
            var superArray = []; // multi dimensional array to hold all row data
            parentGroup.addEventListener("focus", focusCallback, true); //if something is focused in the parent scope run the inputHandler function
            function focusCallback(e)//focus callback, e is 'this' object
            {   
                //get the grandparent node
                var formRowParent = e.target.parentNode.parentNode; //get the repeat-group row
                // get the current row index based on element clicked
                var currentIndex = self.groupIndex(formRowParent);
                //see if there is another row and if so add this as a bool to the variable 
                var nextItem = document.querySelectorAll('[data-num="' +  currentIndex + 1 + '"]').length; 
                if (nextItem != 0){ nextItem = true; } else { nextItem = false; }
                // return all of the input items in the current group
                
                self.inputs = self.loopFormTypes(formRowParent);
                groupInputValArray = []; //array of all the form elements
                superArray[currentIndex] = []; //current row of values of all form elements
                var emptyCounter = []; //multi array to determine how many inputs have data
                emptyCounter[currentIndex] = 0; //start at zero

                self.inputLoop(self.inputs, setEmptyArrayVals ); //loop through each form element and use the below logic

                function setEmptyArrayVals() //function created to use the local variables above
                {
               
                     if ( self.inputs[a].length > 1)
                     {
                        //if there are a group in inputs such as input = text then go through
                        //each one and see if it is empty or has a value
                        for ( b = 0; b <= self.inputs[a].length -1; b++)
                        {
                           
                           //console.log(superArray);
                           groupInputValArray.push( self.inputs[a][b].getAttribute('data-set')); 
                            if ( self.inputs[a][b].getAttribute('type') == 'radio' )
                            {

                                
                               if (self.inputs[a][b].checked == true)
                               {
                                 var this_parent = self.inputs[a][b].offsetParent; 
                                 var this_children = this_parent.children; 

                                 for ( var c = 0; c <= this_children.length - 1; c++)
                                 {
                                    if ( this_children[c].getAttribute('data-set') !== '' && this_children[c].getAttribute('type') == 'radio')
                                    {
                                        this_children[c].setAttribute('data-set', 'true'); 
                                    }                                    
                                }
                            }
                             //if the form element has a value then we need to set the data-set to true; 
                        }

                         else if (self.inputs[a][b].value != "")  { 
                                self.inputs[a][b].setAttribute('data-set', true); 
                            }
                          //if a radio button is checked then all other radio buttons with the same name
                            //need to have the data-set value to tru
                           
                        }
                    }
                }


                superArray[currentIndex] = groupInputValArray; 
                //if the array contains only one null then add another form group
                //and if there is not another row of data then append the group 
                var falseCounter = 0; 
                    for( var d = 0; d <= superArray[currentIndex].length -1; d++ )
                    {
                        if ( superArray[currentIndex][d] == 'false' )
                        {
                            falseCounter++; 
                        }
                    } 
                    console.log(currentIndex);
                    console.log(superArray[currentIndex]);
                    console.log('falseCounter = ' + falseCounter);
                if (falseCounter == 1 ) 
                {
                    self.appendGroup(currentIndex, formRowParent);
                }
               
            }
        }; 

      
        //get number of rows there are
        //if the length = current row array then create option of creating a new row
        this.appendGroup = function(currentIndex) {
           
            var newNode, newNodeCopy; 
            newNode = document.getElementById(this.groupTag).cloneNode(true); 
            newNodeCopy = newNode; 
            //remove all values from our cloned group. Set all of the data-types to false
            //and uncheck any of the radio inputs 
            function removeInputValues(){
                    var inputs = self.loopFormTypes(newNodeCopy);

                    for ( var a = 0; a <= inputs.length - 1; a++)
                    {
                        if ( inputs[a].length > 1)
                        {
                            //if there are a group in inputs such as input = text then go through
                            //each one and see if it is empty or has a value
                            for ( b = 0; b <= inputs[a].length -1; b++)
                            {
                                inputs[a][b].value = "";
                                inputs[a][b].setAttribute('data-set', 'false'); 
                                if ( inputs[a][b].getAttribute('type', 'radio') )
                                {
                                    
                                    inputs[a][b].setAttribute('name', inputs[a][b].getAttribute('name')+ currentIndex);
                                }
                                inputs[a][b].checked = false; 
                            }
                        }
                        else 
                        { 
                            if ( inputs[a][0] !== undefined)
                            {
                                inputs[a][0].value = "";
                                inputs[a][0].setAttribute('data-set', 'false'); 

                                if ( inputs[a][b].getAttribute('type', 'radio') )
                                {
                                    
                                    inputs[a][0].setAttribute('name', inputs[a][b].getAttribute('name')+ currentIndex);
                                }

                                inputs[a][0].checked = false; 
                            }
                        }
                    }
            }
            removeInputValues(); 
        
            newNode.removeAttribute('id');
            newNode.setAttribute('data-num', this.numberOfRows() + 1); // give this the new index
            //newFormGroup = newFormGroup;
            document.getElementById('repeat-group').parentNode.appendChild(newNode);
            //see if there is another group already in exsistance, 
            //if not then add the new row. 
            newNode = ''; //destroy the copy!
            var test = document.getElementById('pickup-inventory-form').getAttribute('data-name'); 
        };

            //if the form group row is not completely filled out and there is another row +1 of the 
            //current row then do not append a new row. 

        this.init(self);
    }

    var newfields = new formAddInputRow();
