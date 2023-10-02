const myTest = async () => {
    try {
        const response = await fetch("http://httpstat.us/500");

        if(!response.ok) {
            throw new Error('This has to work');
        }

        const data = await response.text();

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

myTest();