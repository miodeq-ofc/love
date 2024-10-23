// Konfiguracja początkowej daty
let startYear = 2023;
let startMonth = 8; // Sierpień to miesiąc 8

// Funkcja dodająca zdjęcia do galerii
function createGallery() {
    const gallery = document.querySelector('.gallery'); // Wybierz element galerii
    let imagesCount = 1; // Licznik zdjęć zaczyna od 1
    const imagesArray = []; // Tablica, która przechowa zdjęcia

    const loadNextImage = () => {
        const img = new Image(); // Tworzymy nowy obiekt obrazu
        img.src = `img/${imagesCount}.png`; // Ścieżka do zdjęcia

        img.onload = function () {
            // Gdy obrazek jest załadowany, dodaj go do tablicy tymczasowej
            const date = new Date(startYear, startMonth - 1 + imagesCount - 1); // Obliczanie daty
            const formattedDate = date.toLocaleString('pl-PL', { month: 'long', year: 'numeric' });

            const galleryItem = document.createElement('div'); // Utwórz nowy element dla zdjęcia
            galleryItem.classList.add('gallery-item');

            const imgElement = document.createElement('img'); // Utwórz element obrazu
            imgElement.src = img.src; // Ustaw źródło obrazu
            imgElement.alt = `Zdjęcie ${imagesCount}`; // Ustaw tekst alternatywny

            const dateLabel = document.createElement('p'); // Utwórz element tekstowy dla daty
            dateLabel.textContent = formattedDate; // Ustaw tekst daty

            galleryItem.appendChild(imgElement); // Dodaj obraz do elementu galerii
            galleryItem.appendChild(dateLabel); // Dodaj datę do elementu galerii

            // Dodaj obiekt galerii do tablicy (tymczasowo)
            imagesArray.push(galleryItem);
            
            imagesCount++; // Zwiększ licznik zdjęć po pomyślnym załadowaniu
            loadNextImage(); // Załaduj następne zdjęcie
        };

        img.onerror = function () {
            // Gdy wystąpi błąd, wyświetlamy dotychczas zebrane zdjęcia w odwrotnej kolejności
            console.log(`Zdjęcie img/${imagesCount}.png nie istnieje. Kończymy ładowanie.`);
            
            // Wyświetl zdjęcia w odwrotnej kolejności (najnowsze pierwsze)
            imagesArray.reverse().forEach(item => gallery.appendChild(item));
        };
    };

    loadNextImage(); // Rozpocznij ładowanie pierwszego zdjęcia
}

// Wywołanie funkcji do tworzenia galerii
createGallery();
