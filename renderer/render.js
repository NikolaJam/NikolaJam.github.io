import { Person } from "../entities/person.js";
var ROW_ID = 0;                                                 //an ID used dynamically for the rows

export function Table() {

    this.render = () => {

        $("<div>").addClass("mainContainer").appendTo(".body-wrap");
        $("<div>").addClass("secondDiv").appendTo(".body-wrap")
        this.people = [];

        $("<div>").addClass("title-row").appendTo(".mainContainer");                //title row
        $("<div>").addClass("name").html("Name").appendTo(".title-row")
        $("<div>").addClass("email").html("Email Address").appendTo(".title-row")
        $("<div>").addClass("mobile").html("Mobile Number").appendTo(".title-row")
        $("<div>").addClass("action").html("Action").appendTo(".title-row")

        $(".secondDiv").append($("<div>").addClass("addClient"));                               //addPerson row
        $("<input>").attr("id", "ime", "type", "text").addClass("add").appendTo(".addClient")
        $("<input>").attr("id", "email", "type", "email").addClass("add").appendTo(".addClient")
        $("<input>").attr("id", "phone", "type", "text").addClass("add").appendTo(".addClient")

        $("<button>Add</button>").appendTo(".addClient").on("click", () => {                        //addPerson button
            var name = $("#ime").val();
            var email = $("#email").val();
            var mobile = $("#phone").val();
            if (name === '') {
                return;
            } else {
                this.addRow(name, email, mobile);
                var name = $("#ime").val("");
                var email = $("#email").val("");
                var mobile = $("#phone").val("");
            }

        })

        this.addRow = (name, email, mobile) => {

            var person = new Person(name, email, mobile);
            this.people.push(person);
            console.log(this.people);
            console.log('ROW_ID: ', ROW_ID);

            var $row = $("<div>").addClass(`row${ROW_ID}`).attr("id", `row${ROW_ID}`).appendTo(".mainContainer");
            $("<div>").addClass("name").html(person.name).appendTo($row);
            $("<div>").addClass("email").html(person.email).appendTo($row);
            $("<div>").addClass("mobile").html(person.mobile).appendTo($row);

            var $button = $("<div>").addClass("buttons").appendTo($row);

            $("<div>").attr("id", "info").appendTo(".secondDiv").on("click", () => { //info screen for READ
                $("#info").css("display", "none")
            });

            $("<button>").addClass("read").html("Read").appendTo($button).on("click", () => {
                
                $("#info").css("display", "flex").html(`click to hide <br>Name: ${person.name}<br> email: ${person.email}<br>Phone Number: ${person.mobile}`);

            });

            $("<button>").addClass("update").html("Update").appendTo($button).on("click", () => {

                $row.html(
                    $("<div>").addClass("clientUpdate").appendTo($row),
                    $("<input>").attr("id", "updateName", "type", "text").addClass("add").val(person.name).appendTo(".clientUpdate"),
                    $("<input>").attr("id", "updateMail", "type", "email").addClass("add").val(person.email).appendTo(".clientUpdate"),
                    $("<input>").attr("id", "updatePhone", "type", "text").addClass("add").val(person.mobile).appendTo(".clientUpdate"),
                    $("<button>SAVE</button>").appendTo(".clientUpdate").addClass("save")
                );
                $(".save").on("click", () => {
                    var clientName = $("#updateName").val();
                    var clientMail = $("#updateMail").val();
                    var clientPhone = $("#updatePhone").val();
                    ROW_ID--;
                    $row.remove();
                    let who = ROW_ID - 1;
                    console.log("Person removed from list at index: ", who);
                    this.people.splice(who, 1);
                    console.log(this.people);
                    this.addRow(clientName, clientMail, clientPhone);

                })
            });

            $("<button>").addClass("delete").html("Delete").appendTo($button).on("click", () => { //done
                let who = this.people.length - 1;  //experimentalno za brisenje od people
                console.log("Person removed from list at index: ", who);
                this.people.splice(who, 1);
                console.log(this.people);
                $row.hide("slow");

            });
            ROW_ID++;

            $($row).click(function () {
                if (this.style.background == "" || this.style.background == "white") {
                    $(this).css('background', 'blue');
                }
                else {
                    $(this).css('background', '');
                }
            });

            return $row;
        }
        this.addRow("Lisa", "lisa@mail.com", "0775553444");
        this.addRow("Tom", "tom@mail.com", "077666555");
        console.log(this.people);
    }
}
