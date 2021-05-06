<div id="contenido">
    <form autocomplete="on" method="post" name="alta_user" id="alta_user">
        <h1>Usuario nuevo</h1>
        <table border='0'>
            <tr>
                <td>Usuario: </td>
                <td><input type="text" id="usuario" name="usuario" placeholder="usuario" value=""/></td>
                <td><font color="red">
                    <span id="error_usuario" class="error">
                        <?php
                            echo "$error_usuario";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Email: </td>
                <td><input type="text" id="email" name="email" placeholder="email" value=""/></td>
                <td><font color="red">
                    <span id="error_email" class="error">
                        <?php
                            echo "$error_email";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Contraseña: </td>
                <td><input type="password" id="pass" name="pass" placeholder="contraseña" value=""/></td>
                <td><font color="red">
                    <span id="error_pass" class="error">
                        <?php
                            echo "$error_pass";
                        ?>
                    </span>
                </font></font></td>
            </tr>
            
            <tr>
                <td>Nombre: </td>
                <td><input type="text" id="nombre" name="nombre" placeholder="nombre" value=""/></td>
                <td><font color="red">
                    <span id="error_nombre" class="error">
                        <?php
                            echo "$error_nombre";
                        ?>
                    </span>
                </font></font></td>
            </tr>
            
            <tr>
                <td>Direccion: </td>
                <td><input type="text" id="dir" name="dir" placeholder="dir" value=""/></td>
                <td><font color="red">
                    <span id="error_dir" class="error">
                        <?php
                            echo "$error_dir";
                        ?>
                    </span>
                </font></font></td>
            </tr>
            <tr>
                <td>Codigo Postal: </td>
                <td><input type="text" id= "postcode" name="postcode" placeholder="postcode" value=""/></td>
                <td><font color="red">
                    <span id="error_postcode" class="error">
                        <?php
                            echo "$error_postcode";
                            ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Ciudad: </td>
                <td><input type="text" id="city" name="city" placeholder="city" value=""/></td>
                <td><font color="red">
                    <span id="error_city" class="error">
                        <?php
                            echo "$error_city";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Pais: </td>
                <td><select id="pais" name="pais" placeholder="pais">
                    <option value="España">España</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Francia">Francia</option>
                    </select></td>
                <td><font color="red">
                    <span id="error_pais" class="error">
                        <?php
                            echo "$error_pais";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Sexo: </td>
                <td><input type="radio" id="sexo-h" name="sexo" placeholder="sexo" value="Hombre"/>Hombre
                    <input type="radio" id="sexo-m" name="sexo" placeholder="sexo" value="Mujer"/>Mujer</td>
                <td><font color="red">
                    <span id="error_sexo" class="error">
                        <?php
                            echo "$error_sexo";
                        ?>
                    </span>
                </font></font></td>
            </tr>
            
            <tr>
                <td>Fecha de nacimiento: </td>
                <td><input id="fecha" type="text" name="fecha_nacimiento" placeholder="fecha de nacimiento" value=""/></td>
                <td><font color="red">
                    <span id="error_fecha_nacimiento" class="error">
                        <?php
                            echo "$error_fecha_nacimiento";
                        ?>
                    </span>
                </font></font></td>
            </tr>
     
            <tr>
                <td><input type="button" name="create" id="create" data-tr="Create" onclick="validate_create()"/></td>
                <td align="right"><a href="index.php?page=controller_user&op=list">Volver</a></td>
            </tr>
        </table>
    </form>
</div>