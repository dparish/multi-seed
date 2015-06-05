(function() {
    describe('Password Service', function() {
        'use strict';

        var passwordService;

        beforeEach(module('seed.services'));

        beforeEach(inject(function(_passwordService_) {
            passwordService = _passwordService_;
        }));

        it('check null', function() {
            expect(passwordService.checkPassword()).toBeFalsy();
            expect(passwordService.checkPassword("hi")).toBeTruthy();
        })

    });
}());
