var topScorers = document.getElementById("top_scorers_table");
var plTbody = document.getElementById("plTbody");
console.log(plTbody)

document.addEventListener("DOMContentLoaded", function () {
  loadPLTable(); // Call loadPLTable function when the DOM content is loaded
  loadPLTopScorers(); // Call loadPLTopScorers function when the DOM content is loaded
});

function loadPLTable() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    var output = "";
    if (this.readyState == 4 && this.status == 200) {
      var responseData = JSON.parse(this.responseText);

      // Extracting the league array from the response data
      var teamsData = responseData.league;
      console.log(teamsData);

      for (var i in teamsData) {
        var formHtml = teamsData[i].form
          .map((result) => {
            if (result == "W") {
              return '<div class="win icon">W</div>';
            } else if (result == "L") {
              return '<div class="loss icon">L</div>';
            } else if (result == "D") {
              return '<div class="drawn icon">D</div>';
            }
          })
          .join("");

        output += `<tr>
                <td>${teamsData[i].position}</td>
                <td class='team'>
                <img class='logo_image' src='${teamsData[i].logo}' />${teamsData[i].name}</td>
                <td>${teamsData[i].played}</td>
                <td>${teamsData[i].won}</td>
                <td>${teamsData[i].drawn}</td>
                <td>${teamsData[i].lost}</td>
                <td>${teamsData[i].for}</td>
                <td>${teamsData[i].against}</td>
                <td>${teamsData[i].for - teamsData[i].against}</td>
                <td>${teamsData[i].points}</td>
                <td class='form'>
                ${formHtml}
                </td>
                </tr>`;
      }
      plTbody.innerHTML = output;
    }
  };

  xhr.open("GET", "league.json", true);

  xhr.send();
}

console.log(topScorers);

function loadPLTopScorers() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    var output = "";
    if (this.readyState == 4 && this.status == 200) {
      var responseData = JSON.parse(this.responseText);
      // Extracting the topscorers array from the response data
      var playersData = responseData.topScorers;
      console.log(playersData);
      for (var i in playersData) {
        output += `<tr>
        <td>${playersData[i].rank}</td>
        <td class='name'>
        ${playersData[i].name}
        <p>${playersData[i].club}</p></td>
        <td>${playersData[i].goals}</td>
        <td>${playersData[i].assists}</td>
        <td>${playersData[i].played}</td>
        <td>${playersData[i].goalsPer90}</td>
        <td>${playersData[i].minsPerGoal}</td>
        <td>${playersData[i].totalShots}</td>
        <td>${playersData[i].goalConversion}%</td>
        <td>${playersData[i].shotAccuracy}%</td>
                </tr>`;

        console.log(playersData[i].rank, playersData[i].name);
      }
      console.log(playersData);
      topScorers.innerHTML = output;
    }
  };

  xhttp.open("GET", "league.json", true);

  xhttp.send();
}
