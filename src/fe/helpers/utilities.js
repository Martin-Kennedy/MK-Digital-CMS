export const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

export const generateHsl = () => {
    for (let i = 0; i < 5; i++) {
        const hsl = 'hsl(' + randomValue(0, 60) + ', ' + randomValue(10, 30) + '%,  ' + randomValue(70, 80) + '%)';
        return hsl;
    }
}