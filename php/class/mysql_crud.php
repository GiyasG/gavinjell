<?php
/*
 * @Author Rory Standley <rorystandley@gmail.com>
 * @Version 1.0
 * @Package Database
 */
class Database{
	/*
	 * Create variables for credentials to MySQL database
	 * The variables have been declared as private. This
	 * means that they will only be available with the
	 * Database class
	 */
	private $db_host = "localhost";  // Change as required
	private $db_user = "authz";  // Change as required
	private $db_pass = "xP9tM715UK";  // Change as required
	private $db_name = "gj";	// Change as required

	/*
	 * Extra variables that are required by other function such as boolean con variable
	 */
	private $con = false; // Check to see if the connection is active
  private $myconn = ""; // This will be our mysqli object
	private $result = array(); // Any results from a query will be stored here
  private $myQuery = "";// used for debugging process with SQL return
  private $numResults = "";// used for returning the number of rows
	public $lastId = "";// used for returning the number of rows

	// public function lastId()
	// {
	//
	// }

	// Function to make connection to database
	public function connect(){
		if(!$this->con){
			$this->myconn = new mysqli($this->db_host,$this->db_user,$this->db_pass,$this->db_name);  // mysql_connect() with variables defined at the start of Database class
            if($this->myconn->connect_errno > 0){
                array_push($this->result,$this->myconn->connect_error);
                return false; // Problem selecting database return FALSE
            }else{
                $this->con = true;
                return true; // Connection has been made return TRUE
            }
        }else{
            return true; // Connection has already been made return TRUE
        }
	}

	public function setName($char_set){
		if($this->con){
			if ($this->myconn->query($char_set)) {
				return;
			}
		}
	}

	// Function to disconnect from the database
    public function disconnect(){
    	// If there is a connection to the database
    	if($this->con){
    		// We have found a connection, try to close it
    		if($this->myconn->close()){
    			// We have successfully closed the connection, set the connection variable to false
    			$this->con = false;
				// Return true tjat we have closed the connection
				return true;
			}else{
				// We could not close the connection, return false
				return false;
			}
		}
    }

	public function sql($sql){
		$query = $this->myconn->query($sql);
        $this->myQuery = $sql; // Pass back the SQL
		if($query){
			// If the query returns >= 1 assign the number of rows to numResults
			$this->numResults = $query->num_rows;
			// Loop through the query results by the number of rows returned
			for($i = 0; $i < $this->numResults; $i++){
				$r = $query->fetch_array();
               	$key = array_keys($r);
               	for($x = 0; $x < count($key); $x++){
               		// Sanitizes keys so only alphavalues are allowed
                   	if(!is_int($key[$x])){
                   		if($query->num_rows >= 1){
                   			$this->result[$i][$key[$x]] = $r[$key[$x]];
						}else{
							$this->result = null;
						}
					}
				}
			}
			return true; // Query was successful
		}else{
			array_push($this->result,$this->myconn->error);
			return false; // No rows where returned
		}
	}

	// Function to SELECT from the database
	public function select($table, $rows = '*', $join = null, $where = null, $order = null, $limit = null){
		// Create query from the variables passed to the function
		$q = 'SELECT '.$rows.' FROM '.$table;
		if($join != null){
			$q .= ' JOIN '.$join;
		}
        if($where != null){
        	$q .= ' WHERE '.$where;
		}
        if($order != null){
            $q .= ' ORDER BY '.$order;
		}
        if($limit != null){
            $q .= ' LIMIT '.$limit;
        }
        // echo $table;
				// echo '</br>';
				// echo $q;
				// echo '</br>';
        $this->myQuery = $q; // Pass back the SQL
				// echo $this->myQuery;
				// echo '</br>';
		// Check to see if the table exists
        if($this->tableExists($table)){
        	// The table exists, run the query
					// echo 'Table exists';
					// echo '</br>';
        	$query = $this->myconn->query($q);
			if($query){
				// If the query returns >= 1 assign the number of rows to numResults
				$this->numResults = $query->num_rows;
				// Loop through the query results by the number of rows returned
				for($i = 0; $i < $this->numResults; $i++){
					$r = $query->fetch_array();
                	$key = array_keys($r);
                	for($x = 0; $x < count($key); $x++){
                		// Sanitizes keys so only alphavalues are allowed
                    	if(!is_int($key[$x])){
                    		if($query->num_rows >= 1){
                    			$this->result[$i][$key[$x]] = $r[$key[$x]];
							}else{
								$this->result[$i][$key[$x]] = null;
							}
						}
					}
				}
				return true; // Query was successful
			}else{
				array_push($this->result,$this->myconn->error);
				return false; // No rows where returned
			}
      	}else{
					// echo 'Table does not exist';
					// echo '</br>';
      		return false; // Table does not exist
    	}
    }

	// Function to insert into the database
    public function insert($table,$params=array()){
    	// Check to see if the table exists
    	 if($this->tableExists($table)){
    	 	$sql='INSERT INTO `'.$table.'` (`'.implode('`, `',array_keys($params)).'`) VALUES ("' . implode('", "', $params) . '")';
            $this->myQuery = $sql; // Pass back the SQL
            // Make the query to insert to the database
            if($ins = $this->myconn->query($sql)){
            	array_push($this->result,$this->myconn->insert_id);
								$this->lastId = $this->myconn->insert_id;
                return true; // The data has been inserted
            }else{
            	array_push($this->result,$this->myconn->error);
                return false; // The data has not been inserted
            }
        }else{
        	return false; // Table does not exist
        }
    }

	//Function to delete table or row(s) from database
    public function delete($table,$where = null){
    	// Check to see if table exists
    	 if($this->tableExists($table)){
    	 	// The table exists check to see if we are deleting rows or table
    	 	if($where == null){
                $delete = 'DROP TABLE '.$table; // Create query to delete table
            }else{
                $delete = 'DELETE FROM '.$table.' WHERE '.$where; // Create query to delete rows
            }
            // Submit query to database
            if($del = $this->myconn->query($delete)){
            	array_push($this->result,$this->myconn->affected_rows);
                $this->myQuery = $delete; // Pass back the SQL
                return true; // The query exectued correctly
            }else{
            	array_push($this->result,$this->myconn->error);
               	return false; // The query did not execute correctly
            }
        }else{
            return false; // The table does not exist
        }
    }


	// Function to update row in database
    public function update($table,$params=array(),$where){
    	// Check to see if table exists
    	if($this->tableExists($table)){
    		// Create Array to hold all the columns to update
            $args=array();
			foreach($params as $field=>$value){
				// Seperate each column out with it's corresponding value
				$args[]=$field.'="'.$value.'"';
			}
			// Create the query
			$sql='UPDATE '.$table.' SET '.implode(',',$args).' WHERE '.$where;
			// Make query to database
            $this->myQuery = $sql; // Pass back the SQL
            if($query = $this->myconn->query($sql)){
            	array_push($this->result,$this->myconn->affected_rows);
            	return true; // Update has been successful
            }else{
            	array_push($this->result,$this->myconn->error);
                return false; // Update has not been successful
            }
        }else{
            return false; // The table does not exist
        }
    }

	// Private function to check if table exists for use with queries
	private function tableExists($table){
		$tablesInDb = $this->myconn->query('SHOW TABLES WHERE Tables_in_'.$this->db_name.' LIKE \''.$table.'\'');
		// print_r($tablesInDb);
		// echo '</br>';
        if($tablesInDb){
        	if($tablesInDb->num_rows == 1){
                return true; // The table exists
            }else{
            	array_push($this->result,$table." does not exist in this database");
                return false; // The table does not exist
            }
        }
    }

	// Public function to return the data to the user
    public function getResult(){
        $val = $this->result;
        $this->result = array();
				// print_r ($val);
        return $val;
    }

    //Pass the SQL back for debugging
    public function getSql(){
        $val = $this->myQuery;
        $this->myQuery = array();
        return $val;
    }

    //Pass the number of rows back
    public function numRows(){
        $val = $this->numResults;
        $this->numResults = array();
        return $val;
    }

    // Escape your string
    public function escapeString($data){
        return $this->myconn->real_escape_string($data);
    }

		public function test_input($data) {
		  $data = trim($data);
		  $data = stripslashes($data);
		  $data = htmlspecialchars($data);
		  return $data;
		}

		public function test_inputs($data) {
		  $data = trim($data);
		  $data = htmlspecialchars($data);
		  return $data;
		}

}

class Table extends Database {

	function get_ParentResult($tbl1, $tbl2=NULL){
		parent::connect();
		parent::setName('SET NAMES \'utf8\'');
		if ($tbl2 == NULL) {
			parent::select($tbl1);
		} else {
      // ($table, $rows = '*', $join = null, $where = null, $order = null, $limit = null)
			// ($tbl1, '*', $tbl2 ON $tbl2.$tbl1_id = $tbl1.id)
			// SELECT * FROM `authority` JOIN `photos` ON `photos`.`authority_id` = `authority`.`id`;
			parent::select($tbl1,"*", $tbl2." ON ".$tbl2.".".$tbl1."_id = ".$tbl1.".id");
		}
		$val = parent::getResult();
		return $val;
	}

	// ('teams', 'projects_team', 'projects', $res[$key]['id']);
	function get_JointResult($tbl1, $tbl2, $tbl3, $pr_id) {
		// echo ($tbl1." ".$tbl2." ".$pr_id);

		$tbl1s = substr($tbl1, 0, -1);
		$tbl3s = substr($tbl3, 0, -1);
		// echo " INNER JOIN ".$tbl2." ON ".$tbl1.".id = ".$tbl2.".".$tbl1s."_id AND ".$tbl2.".".$tbl3s."_id = ".$pr_id." INNER JOIN ".$tbl3." ON ".$tbl2.".".$tbl3s."_id = ".$tbl3.".id";
		parent::connect();
		parent::setName('SET NAMES \'utf8\'');
		// echo " INNER JOIN ".$tbl2." ON ".$tbl1.".id = ".$tbl2.".".$tbl1s."_id AND ".$tbl2.".".$tbl3s."_id = '".$pr_id."' INNER JOIN ".$tbl3." ON ".$tbl2.".".$tbl3s."_id = ".$tbl3.".id";
		// echo $tbl2." ON ".$tbl1.".id = ".$tbl2.".".$tbl1s."_id AND ".$tbl2.".".$tbl3s."_id = '".$pr_id."' INNER JOIN ".$tbl3." ON ".$tbl2.".".$tbl3s."_id = ".$tbl3.".id";
		parent::select($tbl1,"*", $tbl2." ON ".$tbl1.".id = ".$tbl2.".".$tbl1s."_id AND ".$tbl2.".".$tbl3s."_id = '".$pr_id."' INNER JOIN ".$tbl3." ON ".$tbl2.".".$tbl3s."_id = ".$tbl3.".id");
		//
		$val = parent::getResult();
		return $val;
	}

}
