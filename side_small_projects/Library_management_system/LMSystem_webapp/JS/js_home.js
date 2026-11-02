function Lib_form(evt, form) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", " ");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(form).style.display = "inline";
    if(document.getElementById(form).style.display == 'block')
    evt.currentTarget.className += " active";
}

function select(evt, form) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(form).style.display = "inline";
    if(document.getElementById(form).style.display == 'block')
      evt.currentTarget.className += " active";
}


function activatesearch()
{
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", " ");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById('SEARCH').style.display = "inline";
    if(document.getElementById('SEARCH').style.display == 'block')
     {
        document.getElementById('SEARCH').classList.add("active");
         evt.currentTarget.className += " active";
     }
     
}
