
# Gain Calculator

This program will give you the gain from a set of data.
## How to use

Rename your data file to "data.csv" and put it into the installation directory.
The last colomn of your data table must be the target.

Example:

data.csv

| Outlook  | Temp | Play Golf |
| ------------- | ------------- | ------------- |
| Rainy  | Hot  | No |
| Rainy  | Hot  | No  |
| Sunny  | Hot  | Yes  |
| Rainy  | Cool  | No |

Then launch the calculator with

```
node index.js <target_yes>
```
<target_yes> is the positive value of your target, in the previous example it will be:
```
node index.js Yes
```

### Output
The calculator will show you a table with the name of every catory and its gain.
