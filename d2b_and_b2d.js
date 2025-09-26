function display() {
    document.getElementById('binary-container').style.display = "block";
    document.getElementById('b2d-container').style.display = "block";
    let input = document.getElementById('input').value;
    let number = parseInt(input);
    let quotient = 0;
    let remainder = 0;
    let step = [];
    let binary = [];

    document.getElementById('error-container').innerHTML = "";

    
    document.getElementById('result-container').innerHTML =
        "<table>" +
        "<thead>" +
        "<tr>" +
        "<th>Number</th>" +
        "<th>Divided by 2</th>" +
        "<th>Quotient</th>" +
        "<th>Remainder</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='rows'></tbody>" +
        "</table>";

    if (number < 0 || isNaN(input)) {
        document.getElementById('error-container').innerHTML = "<div id='error'>" + number + " INVALID NUMBER, ACCEPTS ONLY POSITIVE INTEGER</div>";
    } else if (number === 0) {
        document.getElementById('rows').innerHTML +=
            "<tr>" +
            "<td> 0 </td>" +
            "<td> 2 </td>" +
            "<td> 0 </td>" +
            "<td> 0 </td>" +
            "</tr>";
    } else {

        while (number > 0) {
            quotient = Math.floor(number / 2);
            remainder = number % 2;

            document.getElementById('rows').innerHTML +=
                "<tr>" +
                "<td>" + number + "</td>" +
                "<td> 2 </td>" +
                "<td>" + quotient + "</td>" +
                "<td>" + remainder + "</td>" +
                "</tr>";

            binary.push(remainder);
            number = quotient;
        }
        binary = binary.reverse();
        let joinedbinary = binary.join('');
        document.getElementById('binary-container').innerHTML = "<br><br><mark><strong>Note: </strong>Write <strong>Remainders</strong><strong>Bottom to Top ⬆️</strong> from the table to get the Binary Number</mark><h2 class='binary-number'>Binary: <code>" + joinedbinary + "</code></h2><br><br>";


        // B2D
        document.getElementById('b2d-container').innerHTML = '';
        document.getElementById('b2d-container').innerHTML +=
            "<h1>Binary to Decimal Converter</h1>" +
            "Binary: <code>" + joinedbinary + "</code><br><br>" +
            "<div id='b2d-step1' class='steps'></div>" +
            "<div id='b2d-step2' class='steps'></div>" +
            "<div id='b2d-step3' class='steps'></div>" +
            "<div id='b2d-step4' class='steps'></div>" +
            "<div id='b2d-step5' class='steps'></div>";

        //  step 1 - 1(2^3)+0(2^2)+1(2^1)+1(2^0)
        let step1 = [];
        for (let i = 0; i < binary.length; i++) {
            step1.push(binary[i] + "(2<sup>" + (binary.length - i - 1) + "</sup>)");
        }
        document.getElementById('b2d-step1').innerHTML = "<span><strong >Step 1:</strong> " + step1.join(' + ') + "</span>";

        //  step 2 - 1(2x2x2)+0(2x2)+1(2)+1()
        let step2 = [];
        for (let i = 0; i < binary.length; i++) {
            let power = binary.length - i - 1;
            let repeated = "";

            if (power === 0) {
                repeated = "1"; // 2^0 is 1
            } else {
                repeated = "2";
                for (let j = 1; j < power; j++) {
                    repeated += "x2";
                }
            }

            step2.push(binary[i] + "(" + repeated + ")");
        }
        document.getElementById('b2d-step2').innerHTML = "<span><strong>Step 2:</strong> " + step2.join(' + ') + "</span>";

        //  step 3 - 

        let step3 = [];
        for (let i = 0; i < binary.length; i++) {
            step3.push(binary[i] + "(" + (2 ** (binary.length - i - 1)) + ")");
        }
        document.getElementById('b2d-step3').innerHTML = "<span><strong>Step 3:</strong> " + step3.join(' + ') + "</span>";

        // step 4
        let step4 = []
        for (let i = 0; i < binary.length; i++) {
            let power = binary.length - i - 1;
            step4.push(binary[i] * (2 ** power));
        }
        document.getElementById('b2d-step4').innerHTML = "<span><strong>Step 4:</strong> " + step4.join(' + ') + "</span>";

        // step 5
        let sum = 0;
        for (let i = 0; i < step4.length; i++) {
            sum += step4[i];
        }
        document.getElementById('b2d-step5').innerHTML = "<span><strong>Step 5:</strong> " + sum + "</span>";
    }
}
