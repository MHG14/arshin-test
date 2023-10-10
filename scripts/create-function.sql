CREATE OR REPLACE FUNCTION edit_total_purchase() RETURNS trigger AS $$
    begin
	    if tg_op = 'UPDATE' THEN
			if OLD.amount <> new.amount and OLD.amount > new.amount then 
	   			update "user" set "totalPurchases" = "totalPurchases" - (OLD.amount - NEW.amount) where "id" = new.user_id;
	    	end if;
       		 if OLD.amount <> new.amount and OLD.amount < new.amount then
       			update "user" set "totalPurchases" = "totalPurchases" + NEW.amount - old.amount where "id" = new.user_id;
       		 end if;
       	end if;
       if tg_op = 'INSERT' THEN
       		update "user" set "totalPurchases" = "totalPurchases" + new.amount where "id" = new.user_id;
       end if;
       		
       return new;
     END;
$$ LANGUAGE plpgsql;