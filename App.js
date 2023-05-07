function savedButton() {
    // console.log("Working")
    let input1 = document.querySelector(".inputBox1").innerHTML;
    let input2 = document.querySelector(".inputBox2").innerHTML;

    localStorage.setItem(input1, input2);
    console.log(localStorage.getItem(input2));
}

let count = 0;
function historyButton() {
    // console.log("working");
    count++;
    if (count % 2 == 1) {
        document.querySelector(".historyData").style.display = "block";
        let data = document.querySelector(".historyData");

        for (savedCalculations in localStorage) {
            let ans = localStorage.getItem(savedCalculations);
            if (ans != null) {
                // console.log(ans);
                let h3 = document.createElement("h3");
                h3.setAttribute('class', 'remove');
                h3.innerHTML = `${savedCalculations} => result = ${ans}`;
                console.log(h3);
                data.appendChild(h3);
            }
        }
    } else {
        document.querySelector(".historyData").style.display = "none";
        let rem = document.querySelector(".remove");
        for (var i = 0; i < rem.clientHeight; i++) {
            rem[i].remove();
        }
    }
}

function SearchButton() {
    // console.log("working");
    let problem = document.getElementById("problem-section").value;
    let category = document.getElementById("category-section").value;
    const urlEncodedInput = encodeURIComponent(problem);
    let fetchApi = fetch(`https://newton.vercel.app/api/v2/${category}/${urlEncodedInput}`)
    // console.log(fetchApi)
    fetchApi.then((response) => {
        // console.log(response.status)
        // console.log(response.ok)
        return response.json();
    }).then((value) => {
        // console.log(value)
        let input2 = value.result;
        document.querySelector(".inputBox2").innerHTML = input2;
    })

    document.querySelector(".inputBox1").innerHTML = category + " :" + problem;
    let key = document.querySelector(".inputBox1").value;
    let ans = document.querySelector(".inputBox2").innerHTML;
    console.log(ans)
    localStorage.setItem(key, ans);
}


function deleteBtn() {
    // console.log(working)
    let key = document.querySelector(".inputBox1").value;
    localStorage.removeItem(key);
    document.querySelector(".inputBox1").value = "";
    document.querySelector(".inputBox2").textContent = "";

    // clear history data
    document.querySelector(".historyData").style.display = "none";
    localStorage.clear();
    let rem = document.querySelectorAll(".remove");
    for (let i = 0; i < rem.length; i++) {
        rem[i].remove();
    }
}
