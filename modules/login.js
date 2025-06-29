import { login, registration, setToken, setUserName } from './api.js';
import { renderApp } from './index.js';

export function renderLogin(container) {
  let isLoginMode = true;

  const renderForm = () => {
    container.innerHTML = `
      <div class="add-form login-form" style="padding: 32px; margin-top: 40px;">
        <h2 class="form-title" style="margin-bottom: 20px; font-size: 20px;">
          ${isLoginMode ? 'Форма входа' : 'Регистрация'}
        </h2>

        ${!isLoginMode
          ? `<input type="text" class="login-name-input add-form-name" placeholder="Введите имя" style="width: 100%; margin-bottom: 12px;" />`
          : ''}

        <input type="text" class="login-login-input add-form-name" placeholder="Введите логин" style="width: 100%; margin-bottom: 12px;" />
        <input type="password" class="login-password-input add-form-name" placeholder="Введите пароль" style="width: 100%; margin-bottom: 24px;" />

        <div class="add-form-row" style="justify-content: center;">
          <button class="login-button add-form-button" style="width: 100%;">
            ${isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <a href="#" class="toggle-mode-link" style="color: #fff; font-size: 14px; text-decoration: underline;">
            ${isLoginMode ? 'Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </a>
        </div>
      </div>
    `;

    container.querySelector('.toggle-mode-link').addEventListener('click', (e) => {
      e.preventDefault();
      isLoginMode = !isLoginMode;
      renderForm();
    });

    container.querySelector('.login-button').addEventListener('click', () => {
      const name = container.querySelector('.login-name-input')?.value.trim();
      const loginValue = container.querySelector('.login-login-input')?.value.trim();
      const password = container.querySelector('.login-password-input')?.value.trim();

      if (!loginValue || !password || (!isLoginMode && !name)) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }

      const authFn = isLoginMode
        ? login(loginValue, password)
        : registration(name, loginValue, password);

      authFn
        .then((response) => {
          if (!response.ok) {
            throw new Error(isLoginMode
              ? 'Неверный логин или пароль'
              : 'Пользователь уже существует');
          }
          return response.json();
        })
        .then((data) => {
          setToken(data.user.token);
          setUserName(data.user.name);
          renderApp();
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  };

  renderForm();
}
