

function addCustomerOrders(orders){

    window.localStorage.setItem("orders",JSON.stringify(orders));

 }



 const orderList = {};
function allUserNames() {
    var nameCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        nameCollect.push(DB.users[i].username);
    }
    return nameCollect;
}

// a function to return all discounted items by looping through the database of beverages
function allDiscounts() {
	  var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {
		if(DB2.spirits[i].discount) {
		  collector.push({"namn":DB2.spirits[i].namn, "namn2":DB2.spirits[i].namn2, "alkoholhalt":DB2.spirits[i].alkoholhalt, "prisinklmoms":DB2.spirits[i].prisinklmoms});
		}
    };
    return collector;
}

function userDetails(userName) {
    var userCollect = [];
    var userID;
    var userIndex;
    var account;

    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
            userIndex = i;
        };
    };

    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            account = DB.account[i].creditSEK;
        }
    };

    userCollect.push(
        DB.users[userIndex].user_id,
        DB.users[userIndex].username,
        DB.users[userIndex].first_name,
        DB.users[userIndex].last_name,
        DB.users[userIndex].email,

        account
    );

    return userCollect;
}

function changeBalance(userName, newAmount) {

    var userID;

    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        };
    };

    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            DB.account[i].creditSEK = newAmount;  
        };
    };
}

function allOrderedBeverages() {

    var collector = [];


    const orders= JSON.parse(localStorage.getItem("orders"));


    for(j=0;j<orders.length;j++){

        for (i = 0; i < DB2.spirits.length; i++) {
            
            if(DB2.spirits[i].artikelid==orders[i]){

                collector.push([DB2.spirits[i].namn, DB2.spirits[i].varugrupp],DB2.spirits[i].prisinklmoms);

            }
            
        };

    }
    
    return collector;
}

function allStrongBeverages(strength) {

    var collector = [];

    for (i = 0; i < DB2.spirits.length; i++) {


        if (percentToNumber(DB2.spirits[i].alkoholhalt) > strength) {

            collector.push([DB2.spirits[i].namn, DB2.spirits[i].varugrupp]);
        };
    };

    return collector;
}

function beverageTypes() {
    var types = [];
    for (i = 0; i < DB2.spirits.length; i++) {
        addToSet(types, DB2.spirits[i].varugrupp);
    };
    return types;
}

function addToSet(set, item) {
    if (!set.includes(item)) {
        set.push(item);
    }
    return set;
}

function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}




