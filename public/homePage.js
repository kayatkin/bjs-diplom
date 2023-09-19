// Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  
  ApiConnector.logout((response) => {
    if (response.success) {
      
      location.reload();
    } 
  });
};

// Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success) {
      
      ProfileWidget.showProfile(response.data);
    }
  });

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function fetchCurrencyRates() {
  ApiConnector.getStocks((currencyRates) => {
    
    updateCurrencyRates(currencyRates);
  });
}

function updateCurrencyRates(currencyRates) {
  
  ratesBoard.clearTable();
  ratesBoard.fillTable(currencyRates.data);
}

fetchCurrencyRates();
setInterval(fetchCurrencyRates, 60000);


// Операции с деньгами
const moneyManager = new MoneyManager();

// Реализация пополнения баланса
moneyManager.addMoneyCallback = (data) => {
  
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      
      ProfileWidget.showProfile(response.data);
      
      moneyManager.setMessage(true, 'Баланс успешно пополнен.');
    } else {
      console.error('Ошибка при пополнении баланса:', response.error);
      
      moneyManager.setMessage(false, 'Ошибка при пополнении баланса: ' + response.error);
    }
  });
};

// Реализация конвертации валюты
moneyManager.conversionMoneyCallback = (data) => {
  
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      
      ProfileWidget.showProfile(response.data);
      
      moneyManager.setMessage(true, 'Конвертация выполнена успешно.');
    } else {
      console.error('Ошибка при конвертации валюты:', response.error);
      
      moneyManager.setMessage(false, 'Ошибка при конвертации валюты: ' + response.error);
    }
  });
};

// Реализация перевода валюты
moneyManager.sendMoneyCallback = (data) => {
  
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      
      ProfileWidget.showProfile(response.data);
      
      moneyManager.setMessage(true, 'Перевод выполнен успешно.');
    } else {
      console.error('Ошибка при переводе валюты:', response.error);
      
      moneyManager.setMessage(false, 'Ошибка при переводе валюты: ' + response.error);
    }
  });
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    console.error('Ошибка при получении списка избранного:', response.error);
    
    favoritesWidget.setMessage(false, 'Ошибка при получении списка избранного: ' + response.error);
  }
});

favoritesWidget.addUserCallback = (userData) => {
  
  ApiConnector.addUserToFavorites(userData, (response) => {
    if (response.success) {
      
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      
      favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в избранное.');
    } else {
      console.error('Ошибка при добавлении пользователя в избранное:', response.error);
      
      favoritesWidget.setMessage(false, 'Ошибка при добавлении пользователя в избранное: ' + response.error);
    }
  });
};

favoritesWidget.removeUserCallback = (userId) => {
  
  ApiConnector.removeUserFromFavorites(userId, (response) => {
    if (response.success) {
      
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
            
      favoritesWidget.setMessage(true, 'Пользователь успешно удален из избранного.');
    } else {
      console.error('Ошибка при удалении пользователя из избранного:', response.error);
      
      favoritesWidget.setMessage(false, 'Ошибка при удалении пользователя из избранного: ' + response.error);
    }
  });
};