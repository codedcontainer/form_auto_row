# Form Auto Row Generator
Written in JavaScript this form generator will create a new form row with inputs by copying the first row and looking to see what inputs have already been adedd. If one is missing and the last item is focues a new row will generate. 

This form generator is incomplete because of the functionality of radio buttons. Radio buttons require the use of values to be set before selecting an option. The gernator was easy to make before the inclusion of radio buttons becasue inputs and select elements do not require values. Checks were made on values being empty, and seeing as how Radio buttons alwasy have a value a new data-attribute needed to be added. Now the problem occurs at the time the attribute is being set. Also, checkboxes have not been included, which would be step two of perfecting the functionatlity of this object. 

Inputs, Select, and Text Area are support. All other elements are not. Use at your own risk. 
