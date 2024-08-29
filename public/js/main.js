// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const resultsList = document.getElementById('results-list');
    const itemContainer = document.getElementById('item-container');

    function displayResults(filteredItems) {
        resultsList.innerHTML = '';
        itemContainer.innerHTML = '';

        if (filteredItems.length === 0) {
            resultsContainer.classList.add('hidden');
            return;
        }

        filteredItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'p-2 hover:bg-gray-200 cursor-pointer';
            listItem.textContent = item.name;
            listItem.addEventListener('click', () => displayItem(item));
            resultsList.appendChild(listItem);

            const itemCard = document.createElement('div');
            itemCard.className = 'bg-gray-50 p-4 border rounded-lg shadow-sm text-center';
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="h-40 w-full object-cover rounded-md mb-2"/>
                <h2 class="text-lg font-semibold mb-2">${item.name}</h2>
                <p class="text-gray-600 mb-2">${item.price}</p>
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Add to Cart
                </button>
            `;
            itemContainer.appendChild(itemCard);
        });

        resultsContainer.classList.remove('hidden');
    }

    function displayItem(item) {
        searchInput.value = item.name;
        resultsContainer.classList.add('hidden');
        displayResults([item]);
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.length > 3) {
            fetch(`/api/search?q=${query}`)
                .then(response => response.json())
                .then(filteredItems => {
                    displayResults(filteredItems);
                });
        } else {
            resultsContainer.classList.add('hidden');
            itemContainer.innerHTML = '';
        }
    });
});
