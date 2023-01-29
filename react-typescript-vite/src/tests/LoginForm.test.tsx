/// <reference types="@wdio/globals/types" />
import React from 'react'
import { $, expect } from '@wdio/globals'
import { Key } from 'webdriverio'
import { render } from '@testing-library/react'
import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
  const onLogin = (...args: any[]) => console.log('YES!', ...args)

  it('should have password input of type password', async () => {
    render(<LoginForm onLogin={() => {}} />);
    await expect($('input[type="password"]')).toBePresent()
  });

  it('should render title with default text', async () => {
    render(<LoginForm onLogin={() => {}} />);
    await expect($('legend=Log In')).toBePresent()
  });

  it('should render title with specified text', async () => {
    const title = 'Please Authenticate';
    render(<LoginForm title={title} onLogin={() => {}} />);
    await expect($(`legend=${title}`)).toBePresent()
  });

  describe('form tests', () => {
    const username = 'testuser123';
    const password = 's3cret';
    let $username: WebdriverIO.Element
    let $password: WebdriverIO.Element
    let $btnLogin: WebdriverIO.Element
    let $form: WebdriverIO.Element

    beforeEach(async () => {
      const { container } = render(<LoginForm onLogin={onLogin} />);
      $username = await $('input[name="username"]');
      $password = await $('input[name="password"]');
      $btnLogin = await $('button=Login')
      $form = await $(container)
    });

    it('should call onLogin with username and password when the Login button is clicked', async () => {
      await $username.setValue(username);
      await $password.setValue(password);
      await $btnLogin.click();
      // ToDo(Christian): verify login function got called
    });

    it('should call onLogin with username and password when enter is pressed in an input', async () => {
      await $username.setValue(username);
      await $password.setValue(password);
      await browser.keys(Key.Enter)
      // ToDo(Christian): verify login function got called
    });

    it('should show both validation errors if login is attempted without entering username or password', async () => {
      await $btnLogin.click();
      await expect($form).toHaveTextContaining('Username is required')
      await expect($form).toHaveTextContaining('Password is required')
      // ToDo(Christian): verify login function was not called
    });

    it('should only show password validation error if login is attempted without entering password', async () => {
      await $username.setValue(username);
      await $btnLogin.click();
      await expect($form).not.toHaveTextContaining('Username is required')
      await expect($form).toHaveTextContaining('Password is required')
      // ToDo(Christian): verify login function was not called
    });

    it('should only show username validation error if login is attempted without entering username', async () => {
      await $password.setValue(username);
      await $btnLogin.click();
      await expect($form).toHaveTextContaining('Username is required')
      await expect($form).not.toHaveTextContaining('Password is required')
      // ToDo(Christian): verify login function was not called
    });

    it('should not show any validation errors before login is attempted', async () => {
      await expect($form).not.toHaveTextContaining('Username is required')
      await expect($form).not.toHaveTextContaining('Password is required')
    });
  });
})
