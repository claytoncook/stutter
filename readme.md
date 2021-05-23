# Stutter
 
Stutter is a CLI tool that allows users to create template documents that can then be filled out and added to the current directory.




## Installation

Clone the project

```bash
  git clone https://github.com/claytonleonardcook/stutter.git
```

Go to the project directory

```bash
  cd stutter
```

Link and make the program global

```bash
  npm link
```

Use Stutter with the following arguments

```bash
  stutter templateName [newFileName]
```
## Overview

Using test-template as an example, each template consists of the folder it's 
stored in, a config.json, and a template file.

The main template folder can be named anything the user desires but any spaces 
within the name should be removed or replaced with a character.

```
.stutter/test-template
```

The config.json is setup to hold the type of file the user is trying to create and
an array of prompts that correspond with the placeholders within the template file.

```json
{
    "type": ".txt",
    "args": [
        "Username",
        "Message"
    ]
}
```

The template file is what stores the actual template text that is trying to be recreated.
Within it, there are placeholders, denoted as ```__0__```, that are replaced by the values
the user inputs to the prompts.

```
Hello, __0__! Welcome to Stutter. Message: __1__
```

When making your own template the best way to make sure everything works is to duplicate the
test-template folder, change the name of the folder, edit the config.json, and edit the
the template file itself.

## Usage/Examples

Using test-template, running the following command will output a file named test.txt in
the current working directory.

```
stutter test-template test
```

Here's what the output of the program would look like:

```
stutter test-template test

Created .stutter directory!
Created .stutter/templates directory
Created templates/test-template directory
Created test-template/config.json
Created test-template/template.txt

prompt: Username:  Test Name
prompt: Message:  Hello World!
```

Afterwards, you should be left with a test.txt file in your current working directory with
the following contents:

```
Hello, Test Name! Welcome to Stutter. Message: Hello World!
```

  
## Uninstalling

If you want to uninstall Stutter you must use the following command.
```
npm rm --global stutter
```
Then, you can go ahead and delete the directory that the project is housed in.