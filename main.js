function calculateFirstForm(event) {
    event.preventDefault(); // Заборона перезавантаження сторінки;
    const Jek = 1.4;
    const Ilet = 90; // A
    const Ct = 92; // Acmm

    // Зчитування значень форми
    const voltage = parseFloat(document.getElementById('voltage')?.value || 0); // U
    const current = parseFloat(document.getElementById('shortCircuitCurrent')?.value || 0); // Ik
    const cutoffTime = parseFloat(document.getElementById('cutoffTime')?.value || 0); // Tф
    const transformerPower = parseFloat(document.getElementById('transformerPower')?.value || 0); // ТП
    const load = parseFloat(document.getElementById('calculatedLoad')?.value || 0); // Sm
    const duration = parseFloat(document.getElementById('duration')?.value || 0); // Tm

    // Обрахунки
    const normalCurrent = (load / 2) / ((3**0.5) * voltage); // Ik
    const emergencyCurrent = normalCurrent * 2;
    const economicCrossSection = normalCurrent / Jek;
    const thermalStability = (current * 1000 * (cutoffTime ** 0.5)) / Ct; 
    // Виведення результатів
    document.getElementById('normalCurrent').textContent = normalCurrent.toFixed(2);
    document.getElementById('emergencyCurrent').textContent = emergencyCurrent.toFixed(2);
    document.getElementById('economicCrossSection').textContent = economicCrossSection.toFixed(2);
    document.getElementById('thermalStability').textContent = thermalStability.toFixed(2);

    // Показати блок з результатами
    document.getElementById('results1').style.display = 'block';

}


function calculateSecondForm(event) {
    event.preventDefault(); // Заборона перезавантаження сторінки;
    const Uch = 10.5;
    const Uk = 10.5;
    const Snom = 6.3;

    // Зчитування значень форми
    const gpp =  parseFloat(document.getElementById('GPP')?.value || 0);
    const power =  parseFloat(document.getElementById('power')?.value || 0); // Sk

    // Обрахунки
    const resistance1 = (Uch ** 2) / power; // Ом
    const resistance2 = (Uk / 100) * (Uch ** 2) / Snom; // Ом
    const sum_res = resistance1 + resistance2;
    const current_value = Uch / ((3 ** 0.5) * sum_res);

    // Виведення результатів
    document.getElementById('sum_res').textContent = sum_res.toFixed(2);
    document.getElementById('currentKZ').textContent = current_value.toFixed(2);

    // Показати блок з результатами
    document.getElementById('results2').style.display = 'block';

}

function calculateThirdForm(event) {
    event.preventDefault(); // Заборона перезавантаження сторінки;
    const Uch = 10.5;
    const Uk = 10.5;
    const Snom = 6.3;

    // Зчитування значень форми
    // Отримання значень від користувача
    const maxShortCircuitVoltage = parseFloat(document.getElementById("maxShortCircuitVoltage").value); // Максимальна напруга короткого замикання
    const ratedVoltage = parseFloat(document.getElementById("ratedVoltage").value); // Номінальна напруга вольтажу
    const transformerPower = parseFloat(document.getElementById("transformerPower").value); // Номінальна потужність трансформатора
    const activeResistance = parseFloat(document.getElementById("activeResistance").value); // Активний опір статора
    const reactiveResistance = parseFloat(document.getElementById("reactiveResistance").value); // Реактивний опір статора
    const minActiveResistance = parseFloat(document.getElementById("minActiveResistance").value); // Мінімальний активний опір статора
    const minReactiveResistance = parseFloat(document.getElementById("minReactiveResistance").value); // Мінімальний реактивний опір статора


    // Обрахунки
    const transformerReactance = (ratedVoltage * Math.pow(maxShortCircuitVoltage, 2)) / (100 * transformerPower);
    const normalReactance = reactiveResistance + transformerReactance;
    const normalTotalImpedance = Math.sqrt(Math.pow(activeResistance, 2) + Math.pow(normalReactance, 2));
    const minReactance = minReactiveResistance + transformerReactance;
    const minTotalImpedance = Math.sqrt(Math.pow(minActiveResistance, 2) + Math.pow(minReactance, 2));
    const sqrt3 = Math.sqrt(3);
    const current3Normal = (maxShortCircuitVoltage * 1000) / (sqrt3 * normalTotalImpedance);
    const current2Normal = current3Normal * (sqrt3 / 2);
    const current3Min = (maxShortCircuitVoltage * 1000) / (sqrt3 * minTotalImpedance);
    const current2Min = current3Min * (sqrt3 / 2);


    // Виведення результатів
    document.getElementById('transformerReactance').textContent = transformerReactance.toFixed(2);
    document.getElementById('normalTotalImpedance').textContent = normalTotalImpedance.toFixed(2);
    document.getElementById('normalReactance').textContent = normalReactance.toFixed(2);
    document.getElementById('minTotalImpedance').textContent = minTotalImpedance.toFixed(2);
    document.getElementById('minReactance').textContent = minReactance.toFixed(2);
    document.getElementById('current3Normal').textContent = current3Normal.toFixed(2);
    document.getElementById('current2Normal').textContent = current2Normal.toFixed(2);
    document.getElementById('current3Min').textContent = current3Min.toFixed(2);
    document.getElementById('current2Min').textContent = current2Min.toFixed(2);


    // Показати блок з результатами
    document.getElementById('results3').style.display = 'block';

}