import styles from './TrustBanner.module.css';

export default function TrustBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.textColumn}>
          <h3 className={styles.title}>Acerca de Nosotros</h3>
          <p className={styles.text}>
            No somos distribuidores oficiales de Chimera Tool, pero facilitamos la adquisición de licencias y créditos para toda Argentina de forma directa, rápida y totalmente segura. ¿Necesitas ayuda o tienes alguna duda? No hay problema, hablanos directo a nuesto WhatsApp
          </p>
          <br />
          <p className={styles.text}>
            Antes de Realizar una compra verifica que tu cuenta de Chimera este activa o crear una en <a href="https://chimeratool.com/es/login" target="_blank" rel="noopener noreferrer" className={styles.highlightLink}>Chimera Tool</a>. Recuerda enviar las credenciales por WhatsApp una vez realizada la compra para poder activar tu licencia o créditos.
          </p>
        </div>

        <div className={styles.actionColumn}>
          <a
            href="https://wa.me/5491123351610"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.01 2.00024C6.49 2.00024 2 6.49024 2 12.0102C2 13.9202 2.54 15.7102 3.48 17.2002L2 22.0102L6.92 20.6102C8.42 21.5002 10.15 22.0102 12.01 22.0102C17.53 22.0102 22.01 17.5202 22.01 12.0102C22.01 6.50024 17.53 2.00024 12.01 2.00024ZM12.01 20.3002C10.37 20.3002 8.84 19.8502 7.51 19.0602L7.26 18.9102L3.92 19.8602L4.88 16.5902L4.72 16.3202C3.88 15.0202 3.39 13.5602 3.39 12.0102C3.39 7.25024 7.25 3.39024 12.01 3.39024C16.77 3.39024 20.63 7.25024 20.63 12.0102C20.63 16.7702 16.77 20.3002 12.01 20.3002ZM17.2 15.1402C16.92 14.9902 15.54 14.3102 15.28 14.2202C15.03 14.1202 14.84 14.0702 14.65 14.3602C14.46 14.6402 13.94 15.2202 13.78 15.4202C13.62 15.6102 13.45 15.6402 13.17 15.5002C12.89 15.3602 11.97 15.0602 10.89 14.0902C10.05 13.3302 9.48 12.4002 9.32 12.1102C9.16 11.8202 9.3 11.6602 9.44 11.5302C9.57 11.4002 9.72 11.2002 9.86 11.0302C10 10.8702 10.05 10.7402 10.14 10.5502C10.23 10.3602 10.19 10.2002 10.12 10.0502C10.05 9.91024 9.48 8.52024 9.25 7.95024C9.02 7.39024 8.79 7.47024 8.62 7.46024C8.45 7.46024 8.26 7.45024 8.07 7.45024C7.88 7.45024 7.57 7.52024 7.31 7.81024C7.05 8.09024 6.32 8.78024 6.32 10.1902C6.32 11.6002 7.35 12.9802 7.5 13.1702C7.64 13.3702 9.48 16.3202 12.45 17.5202C13.15 17.8002 13.71 17.9702 14.15 18.1002C14.86 18.3202 15.51 18.2802 16.03 18.2002C16.61 18.1102 17.82 17.4702 18.08 16.7602C18.34 16.0502 18.34 15.4402 18.26 15.3102C18.18 15.1802 17.99 15.1002 17.7 14.9502H17.2Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
