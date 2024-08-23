let examples = {};

function loadExamples() {
    fetch('examples.json')
        .then(response => response.json())
        .then(data => {
            examples = data;
            const exampleSelector = document.getElementById('exampleSelector');
            for (const key in examples) {
                if (examples.hasOwnProperty(key)) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = key;
                    exampleSelector.appendChild(option);
                }
            }
        })
        .catch(error => console.error('Error loading examples:', error));
}

function loadExample() {
    const selectedExample = document.getElementById('exampleSelector').value;
    if (selectedExample && examples[selectedExample]) {
        document.getElementById('method').value = examples[selectedExample].method;
        document.getElementById('params').value = JSON.stringify(examples[selectedExample].params, null, 2);
    }
}

function sendRpcRequest() {
    const method = document.getElementById('method').value;
    const params = document.getElementById('params').value;
    const rpcRequest = {
        jsonrpc: "2.0",
        method: method,
        params: JSON.parse(params),
        id: 1
    };

    fetch('http://localhost:3000/jsonrpc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rpcRequest)
    })
    .then(response => response.json())
    .then(data => {
        const responseElement = document.getElementById('response');
        responseElement.textContent = JSON.stringify(data, null, 2);
        Prism.highlightElement(responseElement);
    })
    .catch(error => {
        const responseElement = document.getElementById('response');
        responseElement.textContent = 'Error: ' + error.message;
        Prism.highlightElement(responseElement);
    });
}

window.onload = loadExamples;
