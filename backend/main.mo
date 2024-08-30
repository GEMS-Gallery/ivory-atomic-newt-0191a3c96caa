import Array "mo:base/Array";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Iter "mo:base/Iter";

actor {
  type TaxPayer = {
    tid: Nat;
    firstName: Text;
    lastName: Text;
    address: ?Text;
  };

  stable var nextTID : Nat = 1;
  let taxPayers = HashMap.HashMap<Nat, TaxPayer>(10, Nat.equal, Nat.hash);

  public func createTaxPayer(firstName: Text, lastName: Text, address: ?Text) : async Result.Result<Nat, Text> {
    let tid = nextTID;
    nextTID += 1;
    let newTaxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(tid, newTaxPayer);
    #ok(tid)
  };

  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  public query func getTaxPayerByTID(tid: Nat) : async Result.Result<TaxPayer, Text> {
    switch (taxPayers.get(tid)) {
      case (null) { #err("TaxPayer not found") };
      case (?taxPayer) { #ok(taxPayer) };
    }
  };

  public func updateTaxPayer(tid: Nat, firstName: Text, lastName: Text, address: ?Text) : async Result.Result<(), Text> {
    switch (taxPayers.get(tid)) {
      case (null) { #err("TaxPayer not found") };
      case (?taxPayer) {
        let updatedTaxPayer : TaxPayer = {
          tid = tid;
          firstName = firstName;
          lastName = lastName;
          address = address;
        };
        taxPayers.put(tid, updatedTaxPayer);
        #ok()
      };
    }
  };

  public func deleteTaxPayer(tid: Nat) : async Result.Result<(), Text> {
    switch (taxPayers.remove(tid)) {
      case (null) { #err("TaxPayer not found") };
      case (?_) { #ok() };
    }
  };

  system func preupgrade() {
    // Implement if needed
  };

  system func postupgrade() {
    // Implement if needed
  };
}
