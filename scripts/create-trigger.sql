CREATE OR REPLACE TRIGGER edit_total_purchase
    AFTER
	INSERT OR
	UPDATE ON purchase FOR EACH ROW
	EXECUTE
	    function edit_total_purchase();
