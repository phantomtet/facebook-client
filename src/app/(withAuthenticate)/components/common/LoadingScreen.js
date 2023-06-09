
const LoadingScreen = () => {

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg height={72} width={72} xmlns='http://www.w3.org/2000/svg' fill='var(--primary-color)' viewBox='0 0 1024 1024'><path d='M1024 512C1024 229.23 794.77 0 512 0S0 229.23 0 512c0 255.554 187.231 467.37 432 505.7778V660H302V512H432V399.2C432 270.88 508.4385 200 625.3892 200 681.4077 200 740 210 740 210V336H675.4371C611.8351 336 592 375.4667 592 415.9573V512H734L711.3 660H592v357.7778C836.769 979.37 1024 767.554 1024 512Z' /></svg>

        </div>
    )
}
export default LoadingScreen
