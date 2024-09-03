const giphyApiKey = "NyxxlIPioUtIJwxN4xD6a4B2J5iwOpiy";
const restApiUrl = "https://api.restful-api.dev";

function searchGifs() {
  const query = document.getElementById("giphyQuery").value;
  if (query) {
    fetchGiphyGifs(query);
  } else {
    alert("Por favor, insira um termo de pesquisa.");
  }
}

function searchCat() {
  const query = document.getElementById("catQuery").value;
  if (query) {
    fetchCat(query);
  } else {
    alert("Por favor, insira um termo de pesquisa.");
  }
}

function clean(output_element) {
  const output = document.getElementById(output_element);
  output.innerHTML = "";
}

function fetchCat(query) {
  const url = `https://cataas.com/cat/says/${query}`;
  fetch(url).then((data) => {
    const output = document.getElementById("responseOutputCat");
    output.innerHTML = "";
    const img = document.createElement("img");
    img.src = data.url;
    output.appendChild(img);
  });
}

function fetchGiphyGifs(query) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
    query
  )}&limit=5`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const output = document.getElementById("responseOutputGif");
      output.innerHTML = "";

      if (data.data.length === 0) {
        output.textContent = "Nenhum GIF encontrado.";
        return;
      }

      data.data.forEach((gif) => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.title = gif.title;
        output.appendChild(img);
      });
    })
    .catch((error) => {
      document.getElementById("responseOutputGif").textContent =
        "Erro: " + error;
    });
}

function displayDataAsList(data) {
  const output = document.getElementById("responseOutputRestGet");
  output.innerHTML = "";

  const ul = document.createElement("ul");

  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = JSON.stringify(item, null, 2);
    li.style.marginBottom = "10px";
    ul.appendChild(li);
  });

  if (data.length === 0) {
    output.textContent = "Nenhum dado encontrado.";
  } else {
    output.appendChild(ul);
  }
}

function searchObject(){
  const query = document.getElementById("objectQuery").value;
  if (query) {
    fetchData(query);
  } else {
    alert("Por favor, insira um termo de pesquisa.");
  }
}

function fetchData(query) {
  fetch(`${restApiUrl}/objects?id=${query}`)
    .then((response) => response.json())
    .then((data) => {
      displayDataAsList(data);
    })
    .catch((error) => {
      document.getElementById("responseOutputRestGet").textContent =
        "Erro: " + error;
    });
}

function postData() {
  const productName = document.getElementById("objectName").value;
  const color = document.getElementById("color").value;
  const price = parseFloat(document.getElementById("price").value);

  const data = {
    name: productName,
    data: {
      cor: color,
      preco: price,
    },
  };

  fetch(`${restApiUrl}/objects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const output = document.getElementById("responseOutputRestPost");
      output.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      document.getElementById("responseOutputRestPost").textContent =
        "Erro: " + error;
    });
}
