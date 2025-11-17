import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import {
  ProductStoreService,
  ErrorHandlingService,
  I18nTranslatorService,
} from 'shared';

import { LoadTranslationsUseCase } from '../translate.use.case';

describe('LoadTranslationsUseCase (Vitest)', () => {
  let useCase: LoadTranslationsUseCase;

  let i18nMock: I18nTranslatorService;
  let storeMock: ProductStoreService;
  let errorHandlerMock: ErrorHandlingService;

  beforeEach(() => {
    i18nMock = {
      loadTranslations: vi.fn(),
    } as any;

    storeMock = {
      setLoading: vi.fn(),
      setCurrentLanguage: vi.fn(),
      setTranslations: vi.fn(),
    } as any;

    errorHandlerMock = {
      handleError: vi.fn(),
    } as any;

    useCase = new LoadTranslationsUseCase(
      i18nMock,
      storeMock,
      errorHandlerMock
    );

    vi.clearAllMocks();
  });

  // 1️⃣ Caso exitoso completo
  it('should load translations, update store and stop loading on success', () => {
    const language = 'es';
    const response = { hello: 'Hola' };

    (i18nMock.loadTranslations as any).mockReturnValue(of(response));

    useCase.execute(language);

    expect(storeMock.setLoading).toHaveBeenCalledWith(true);
    expect(i18nMock.loadTranslations).toHaveBeenCalledWith('es');

    expect(storeMock.setCurrentLanguage).toHaveBeenCalledWith('es');
    expect(storeMock.setTranslations).toHaveBeenCalledWith(response);

    // Última llamada debe ser setLoading(false)
    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // 2️⃣ Caso con error: debe llamar handleError y cancelar loading
  it('should call error handler and setLoading(false) on error', () => {
    const language = 'fr';
    const error = new Error('Network fail');

    (i18nMock.loadTranslations as any).mockReturnValue(throwError(() => error));

    useCase.execute(language);

    expect(errorHandlerMock.handleError).toHaveBeenCalledWith(
      error,
      'Failed to load translations.'
    );

    // Debe apagar loading en error
    const calls = storeMock.setLoading.mock.calls;
    expect(calls[calls.length - 1][0]).toBe(false);
  });

  // 3️⃣ Debe llamar setLoading(true) primero SIEMPRE
  it('should always call setLoading(true) before doing anything else', () => {
    (i18nMock.loadTranslations as any).mockReturnValue(of({}));

    useCase.execute('en');

    expect(storeMock.setLoading.mock.calls[0][0]).toBe(true);
  });

  // 4️⃣ Debe llamar setLoading(false) en complete() aunque no haya errors
  it('should call setLoading(false) on complete()', () => {
    (i18nMock.loadTranslations as any).mockReturnValue(of({ key: 'value' }));

    useCase.execute('en');

    const calls = storeMock.setLoading.mock.calls;

    expect(calls[calls.length - 1][0]).toBe(false);
  });

  it('should NOT update language or translations if an error occurs', () => {
    const error = new Error('fail');
    (i18nMock.loadTranslations as any).mockReturnValue(throwError(() => error));

    useCase.execute('es');

    expect(storeMock.setCurrentLanguage).not.toHaveBeenCalled();
    expect(storeMock.setTranslations).not.toHaveBeenCalled();
  });
});
