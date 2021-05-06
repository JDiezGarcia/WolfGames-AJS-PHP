<div id="contenido">
    <div class="container">
    	<div class="row">
    			<h3>LISTA DE USUARIOS</h3>
    	</div>
    	<div class="row">
    		<p><a href="index.php?page=controller_user&op=create"><img src="view/img/anadir.png"></a></p>
    		
    		<table id='crud-table'>
                <thead>
                    <tr>
                        <th width=125><b>Usuario</b></th>
                        <th width=125><b>Email</b></th>
                        <th width=125><b>Nombre</b></th>
                        <th width=350><b>Accion</b></th>
                    </tr>
                </thead>
                <tbody id='list-user'>
                    <?php
                        if ($rdo->num_rows === 0){
                            echo '<tr>';
                            echo '<td align="center"  colspan="3">NO HAY NINGUN USUARIO</td>';
                            echo '</tr>';
                        }else{
                            foreach ($rdo as $row) {
                                echo '<tr>';
                                echo '<td width=125>'. $row['user'] . '</td>';
                                echo '<td width=125>'. $row['email'] . '</td>';
                                echo '<td width=125>'. $row['name'] . '</td>';
                                echo '<td id="buttons-crud">';
                                print ("<div class='Button_blue user-read-button' id='".$row['user']."'>Read</div>");
                                echo '<a class="Button_green" href="index.php?page=controller_user&op=update&id='.$row['user'].'">Update</a>';
                                print ("<div class='Button_red user-delete-button' id='".$row['user']."'>Delete</div>");
                                echo '</td>';
                                echo '</tr>';
                            }
                        }
                    ?>
                </tbody>
            </table>
    	</div>
    </div>
</div>

<div id="user-modal">

</div>

<div id="user-delete-modal">
    <span data-tr="Message-Delete"></span><span id="user2"></span>
</div>