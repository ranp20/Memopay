<p align="center">
	<img src="admin\views\assets\img\logos\logo_principal\Memopay_logo-resize-3.png" width="325" height="103" alt="Logo Memopay"/>
</p>

**Memopay** es un servicio de cambio de divisas y de transacciones sin cobro de comisiones más allá de los de la entidad financiera.

## 🚀 Instalación
> **Requiere [PHP 7.3+](https://www.php.net/releases/)**
1. Instalar las dependencias de node.js
```bash
npm install
```
2. Cambiar en el archivo `.htaccess`
```bash
# Por comentar más información...
```

## 🔄🎨 Compilar SCSS
Ejecutar el siguiente comando para compilar estilos `.scss`, tanto en los distintos entornos:
### En el FRONTEND
```shell
sass --watch views/assets/sass/styles.scss views/assets/css/styles.min.css --style=compressed

```
### En el BACKEND
```shell
sass --watch admin/views/assets/sass/styles.scss admin/views/assets/css/styles.min.css --style=compressed

```