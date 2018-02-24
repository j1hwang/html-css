/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');
// var input = document.querySelectorAll('.pwd');


function IssueTracker() {
	this.issues = [];
}

IssueTracker.prototype = {

	add: function (issue) {
		this.issues.push(issue);
	},

	retrieve: function () {
		var message = "";

		switch (this.issues.length) {
		case 0:
		// do nothing because message is already ""
			break;
		case 1:
			message = "Please correct the following issue:\n" + this.issues[0];
			break;
		default:
			message = "Please correct the following issues:\n" + this.issues.join("\n");
			break;
		}
		return message;
	}
};

submit.onclick = function() {

	var firstPassword = firstPasswordInput.value;
	var secondPassword = secondPasswordInput.value;

	var firstInputIssuesTracker = new IssueTracker();
	var secondInputIssuesTracker = new IssueTracker();


	function checkRequirements() {
	
		if (firstPassword.length < 16) {
			firstInputIssuesTracker.add("fewer than 16 characters");
		} else if (firstPassword.length > 100) {
			firstInputIssuesTracker.add("greater than 100 characters");
		}

		if (!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
			firstInputIssuesTracker.add("missing a symbol (!, @, #, $, %, ^, &, *)");
		}

		if (!firstPassword.match(/\d/g)) {
			firstInputIssuesTracker.add("missing a number");
		}

		if (!firstPassword.match(/[a-z]/g)) {
			firstInputIssuesTracker.add("missing a lowercase letter");
		}

		if (!firstPassword.match(/[A-Z]/g)) {
			firstInputIssuesTracker.add("missing an uppercase letter");
		}

		var illegalCharacterGroup = firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)
		if (illegalCharacterGroup) {
			illegalCharacterGroup.forEach(function (illegalChar) {
				firstInputIssuesTracker.add("includes illegal character: " + illegalChar);
			});
		}
	};

	if (firstPassword === secondPassword && firstPassword.length > 0) {
		checkRequirements();
	} else {
		secondInputIssuesTracker.add("Passwords must match!");
	}

	var firstInputIssues = firstInputIssuesTracker.retrieve()
	var secondInputIssues = secondInputIssuesTracker.retrieve()

	firstPasswordInput.setCustomValidity(firstInputIssues);
	secondPasswordInput.setCustomValidity(secondInputIssues);

	// You would probably replace this with a POST message in a real app.
	if (firstInputIssues.length + secondInputIssues.length === 0) {
		console.log("Password change successful!");
		alert("Password change successful!");
	}
};